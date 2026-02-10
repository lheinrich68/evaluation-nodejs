const prisma = require("../config/prisma-client.js");

const findAllUsers = async () => {
    return prisma.user.findMany();
}

const findUserById = async (userId) => {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}

const findUserByEmail = async (userEmail) => {
    return await prisma.user.findUnique(
        {
            where: {
                email: userEmail
            }
        })
}

const createUser = async (userData) => {
    const user = await prisma.user.create({
        data: {
            email: userData.email,
            name: userData.name,
            password: userData.password,
        }
    })
    return user;
}



module.exports = {
    findAllUsers,
    findUserById,
    findUserByEmail,
    createUser,
}