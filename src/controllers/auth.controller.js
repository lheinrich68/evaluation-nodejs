const userService = require("../services/auth.service.js");

const register = async (req, res) => {
    try {
        const bodyData = req.body;
        const result = await userService.register(bodyData);
        res.status(201).json({
            message: "User registered successfully",
            data: result
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(error.status || 500).json({
            message: error.message || "Error during registration"
        });
    }
}

const login = async (req, res) => {
    try {
        const bodyData = req.body;
        const result = await userService.login(bodyData);
        res.status(200).json({
            message: "User logged in successfully",
            data: result
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(error.status || 500).json({
            message: error.message || "Error during login"
        });
    }
}

module.exports = {
    register,
    login,
}