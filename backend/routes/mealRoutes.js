const express = require("express");
const router = express.Router();
const {
  generateMealPlan,
  getMyMealPlans,
  replaceMeal
} = require("../controllers/mealController");
const { protect } = require("../middleware/authMiddleware");
router.post("/generate", protect, generateMealPlan);
router.get("/my-plans", protect, getMyMealPlans);
router.put("/:id/replace", protect, replaceMeal);
module.exports = router;
