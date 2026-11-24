const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createTokens = (userId) => {
    const accessToken = jwt.sign(
        { id: userId },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
    return { accessToken, refreshToken };
};
// REGISTER
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }
        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        const tokens = createTokens(user._id);
        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            ...tokens
        });
    } catch (error) {
        console.error("Register error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Registration failed"
        });
    }
};
// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        const user = await User.findOne({
            email: email.toLowerCase()
        }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const tokens = createTokens(user._id);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            ...tokens
        });
    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};
module.exports = { register, login };
