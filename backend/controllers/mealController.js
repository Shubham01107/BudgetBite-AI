const Meal = require("../models/Meal");
const menus = {
  vegetarian: {
    breakfast: [
      { name: "Poha with peanuts", cost: 30, calories: 280 },
      { name: "Vegetable upma", cost: 35, calories: 300 },
      { name: "Besan chilla with curd", cost: 40, calories: 320 },
      { name: "Oats with banana", cost: 35, calories: 290 },
      { name: "Idli with sambar", cost: 40, calories: 310 },
      { name: "Dalia with milk", cost: 30, calories: 270 },
      { name: "Aloo paratha with curd", cost: 45, calories: 380 }
    ],
    lunch: [
      { name: "Dal rice with salad", cost: 55, calories: 480 },
      { name: "Rajma rice", cost: 60, calories: 520 },
      { name: "Chole with roti", cost: 55, calories: 490 },
      { name: "Vegetable pulao with raita", cost: 60, calories: 500 },
      { name: "Kadhi rice", cost: 50, calories: 460 },
      { name: "Soya chunks with roti", cost: 65, calories: 540 },
      { name: "Mixed vegetable khichdi", cost: 45, calories: 420 }
    ],
    dinner: [
      { name: "Paneer bhurji with roti", cost: 70, calories: 520 },
      { name: "Dal tadka with rice", cost: 55, calories: 470 },
      { name: "Mixed dal with roti", cost: 55, calories: 460 },
      { name: "Vegetable khichdi with curd", cost: 50, calories: 440 },
      { name: "Soya curry with roti", cost: 65, calories: 510 },
      { name: "Aloo gobi with roti", cost: 50, calories: 430 },
      { name: "Paneer curry with rice", cost: 75, calories: 550 }
    ]
  },
  nonVegetarian: {
    breakfast: [
      { name: "Boiled eggs with toast", cost: 40, calories: 320 },
      { name: "Omelette with bread", cost: 40, calories: 330 },
      { name: "Poha with boiled eggs", cost: 45, calories: 350 },
      { name: "Egg paratha with curd", cost: 50, calories: 390 },
      { name: "Oats with banana", cost: 35, calories: 290 },
      { name: "Vegetable upma", cost: 35, calories: 300 },
      { name: "Dalia with milk", cost: 30, calories: 270 }
    ],
    lunch: [
      { name: "Chicken rice bowl", cost: 85, calories: 570 },
      { name: "Egg curry with rice", cost: 65, calories: 510 },
      { name: "Rajma rice", cost: 60, calories: 520 },
      { name: "Chicken curry with roti", cost: 90, calories: 590 },
      { name: "Dal rice with salad", cost: 55, calories: 480 },
      { name: "Egg pulao", cost: 65, calories: 500 },
      { name: "Chole with roti", cost: 55, calories: 490 }
    ],
    dinner: [
      { name: "Chicken curry with roti", cost: 90, calories: 590 },
      { name: "Egg bhurji with roti", cost: 60, calories: 450 },
      { name: "Dal tadka with rice", cost: 55, calories: 470 },
      { name: "Chicken stir fry with rice", cost: 85, calories: 560 },
      { name: "Egg curry with roti", cost: 65, calories: 490 },
      { name: "Soya chunks with roti", cost: 65, calories: 510 },
      { name: "Vegetable khichdi", cost: 45, calories: 420 }
    ]
  }
};
const days = [
  "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday", "Sunday"
];
function chooseMeal(pool, maxCost, index) {
  const affordable = pool.filter(meal => meal.cost <= maxCost);
  const choices = affordable.length
    ? affordable
    : [pool.reduce((cheapest, meal) =>
        meal.cost < cheapest.cost ? meal : cheapest
      )];
  return choices[index % choices.length];
}
const generateMealPlan = async (req, res) => {
  try {
    const { dailyBudget, preferences } = req.body;
    const budget = Number(dailyBudget);
    if (!Number.isFinite(budget) || budget <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid daily budget."
      });
    }
    const preference = String(preferences || "Vegetarian");
    const isNonVeg = preference.toLowerCase().includes("non");
    const menu = isNonVeg ? menus.nonVegetarian : menus.vegetarian;
    const meals = days.map((day, index) => {
      const breakfast = chooseMeal(menu.breakfast, budget * 0.30, index);
      const lunch = chooseMeal(menu.lunch, budget * 0.40, index + 2);
      const dinner = chooseMeal(menu.dinner, budget * 0.40, index + 4);
      return {
        day,
        breakfast: breakfast.name,
        lunch: lunch.name,
        dinner: dinner.name,
        estimatedCost: breakfast.cost + lunch.cost + dinner.cost,
        calories: breakfast.calories + lunch.calories + dinner.calories
      };
    });
    const mealPlan = await Meal.create({
      user: req.user._id,
      weekStart: new Date(),
      dailyBudget: budget,
      preferences: preference,
      meals
    });
    return res.status(201).json({
      success: true,
      message: "Your personalized 7-day meal plan is ready!",
      mealPlan
    });
  } catch (error) {
    console.error("Meal generation error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to generate meal plan.",
      error: error.message
    });
  }
};
const getMyMealPlans = async (req, res) => {
  try {
    const mealPlans = await Meal.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      mealPlans
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch meal plans."
    });
  }
};
const replaceMeal = async (req, res) => {
  try {
    const { day, mealType, newMeal } = req.body;
    const allowedTypes = ["breakfast", "lunch", "dinner"];
    if (!day || !allowedTypes.includes(mealType) || !newMeal?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid meal replacement details."
      });
    }
    const mealPlan = await Meal.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    if (!mealPlan) {
      return res.status(404).json({
        success: false,
        message: "Meal plan not found."
      });
    }
    const dayPlan = mealPlan.meals.find(item => item.day === day);
    if (!dayPlan) {
      return res.status(404).json({
        success: false,
        message: "Day not found in meal plan."
      });
    }
    dayPlan[mealType] = newMeal.trim();
    await mealPlan.save();
    return res.status(200).json({
      success: true,
      message: "Meal replacement saved successfully!",
      mealPlan
    });
  } catch (error) {
    console.error("Meal replacement error:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to replace meal."
    });
  }
};
module.exports = {
  generateMealPlan,
  getMyMealPlans,
  replaceMeal
};

