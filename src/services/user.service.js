const userRepository = require("../repositories/user.repository.js");

const fetchAllUsers = async () => {
    const users = await userRepository.findAllUsers();

    if (users.length <= 0) {
        throw {
            status: 404,
            message: "❔  No User.",
        }
    }

    return users
}

const getUserById = async (userId) => {
    const user = await userRepository.findUserById(userId);
    if (!user) {
        throw {
            status: 404,
            message: "❔  User not found.",
        }
    }

    return user;
}

const createUser = async (userBody) => {
    const user = await userRepository.createUser(userBody);
    if (!user) {
        throw {
            status: 404,
            message: "User not found.",
        }
    }
    return user;
}

module.exports = {
    fetchAllUsers,
    getUserById,
    createUser,
}