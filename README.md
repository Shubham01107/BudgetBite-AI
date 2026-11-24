# 🍽️ BudgetBite AI
**Smart Meal Planning & Budget Management Platform**
BudgetBite AI is a full-stack web application designed to help users plan weekly meals, manage grocery lists, track expenses, and monitor their food budget in one place.
## ✨ Features
- **User Authentication:** Register and log in securely.
- **Dashboard:** Access your meal planning and budget overview.
- **Meal Planner:** Generate a 7-day meal plan with vegetarian and non-vegetarian preferences.
- **Meal Management:** Save meal plans and replace meals.
- **Grocery Management:** Add, update, and delete grocery items.
- **Budget Management:** Set a monthly budget and record expenses.
- **Analytics:** View spending summaries and estimated grocery costs.
- **Responsive Interface:** Use the application across desktop and mobile screens.
## 🛠️ Tech Stack
### Frontend
- React.js
- Vite
- JavaScript
- CSS
- React Router
- Lucide React
- Framer Motion
### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
## 📁 Project Structure
```text
BudgetBite-AI/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
│
└── README.md
```
## 🚀 Installation & Setup
### 1. Clone the repository
```bash
git clone https://github.com/Shubham01107/BudgetBite-AI.git
cd BudgetBite-AI
```
### 2. Setup Backend
```bash
cd backend
npm install
```
Create a `.env` file inside the backend folder and configure your MongoDB connection string, JWT secret, and other environment variables required by the backend.
Start the backend:
```bash
npm run dev
```
The backend runs on port 5000 by default.
### 3. Setup Frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the local URL displayed by Vite in your browser.
Make sure the frontend API configuration points to your running backend.
## 🔐 Security
- Environment variables are stored separately in `.env`.
- Sensitive credentials should never be committed to GitHub.
- Authentication uses JWT.
- Passwords are hashed using bcrypt.
## 📌 Current Project Status
- Frontend production build successful.
- Backend server running successfully.
- MongoDB connection verified.
- Registration and login tested.
- Meal planning and grocery/budget features tested.
**Note:** Grocery and budget data currently use browser local storage. Meal plans and user accounts use the backend.
## 👨‍💻 Developer
**Shubham Gautam**
B.Tech – Computer Science Engineering  
Artificial Intelligence & Machine Learning
GitHub: [Shubham01107](https://github.com/Shubham01107)
---
⭐ If you find this project interesting, consider giving the repository a star!
