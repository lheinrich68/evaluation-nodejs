const userService = require("../services/user.service.js");

const fetchAllUsers = async (req, res) => {
    try {
        const users = await userService.fetchAllUsers()
        res.status(200).json({
            message: "Users retrieved successfully",
            data: users
        });
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message || "Error retrieving users"
        });
    }
}

const fetchOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(parseInt(id));
        res.status(200).json({
            message: "User retrieved successfully",
            data: user
        });
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message || "Error retrieving user"
        });
    }
}

const createUser = async (req, res) => {
    try {
        const body = req.body;
        const user = await userService.createUser(body)
        res.status(201).json({
            message: "User created successfully",
            data: user
        });
    } catch (err) {
        res.status(err.status || 500).json({
            message: err.message || "Error creating user"
        });
    }
}

module.exports = {
    fetchAllUsers,
    fetchOneUser,
    createUser,
}