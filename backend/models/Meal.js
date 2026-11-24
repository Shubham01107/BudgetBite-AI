
const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    weekStart: {
      type: Date,
      required: true
    },
    dailyBudget: {
      type: Number,
      required: true
    },
    preferences: {
      type: String,
      default: "Vegetarian"
    },
    meals: [
      {
        day: String,
        breakfast: String,
        lunch: String,
        dinner: String,
        estimatedCost: Number,
        calories: Number
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meal", mealSchema);
