const userRepository = require("../repositories/user.repository.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {findUserByEmail} = require("../repositories/user.repository");

const register = async (bodyData) => {
    try {
        //Déstructuration des données
        const { email, name, password } = bodyData;

        // Validation des champs requis
        if (!email || !name || !password) {
            throw {
                status: 400,
                message: "❌ Email, name et password sont requis."
            }
        }

        //Vérification de l'existence de l'user
        //Retourne une erreur si celui-ci existe dans la database
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            throw {
                status: 409,
                message: "🚫  User already exists."
            }
        }

        //Hashage du mot de passe avec bcrypt
        const saltRounds = 10;
        const hashPswd = await bcrypt.hash(password, saltRounds);

        //Création de l'utilisateur en base de données
        const userData = {
            email: email,
            name: name,
            password: hashPswd,
        }

        const createdUser = await userRepository.createUser(userData);

        //Création du token JWT avec id et name
        const payload = {
            sub: createdUser.id,
            email: createdUser.email,
            name: createdUser.name,
            role: createdUser.role,
        }

        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, {expiresIn: "24h"});

        return {
            user: {
                id: createdUser.id,
                email: createdUser.email,
                name: createdUser.name,
            },
            token: token
        }
    } catch (error) {
        // Gestion des erreurs Prisma
        if (error.code === 'P2002') {
            throw {
                status: 409,
                message: "❌ Cet email est déjà utilisé."
            }
        }
        // Re-throw si c'est déjà une erreur structurée
        if (error.status) {
            throw error;
        }
        // Autres erreurs
        throw {
            status: 500,
            message: "❌ Erreur lors de l'enregistrement: " + error.message
        }
    }
}

const login = async (bodyData) => {
    const { email, password } = bodyData;

    const user = await findUserByEmail(email);
    if (!user) {
        throw {
            status: 401,
            message: "❌  Identifiant ou mot de passe invalide."
        }
    }

    const isVerified = await bcrypt.compare(password, user.password)

    if (!isVerified) {
        throw {
            status: 401,
            message: "❌  Identifiant ou mot de passe invalide."
        }
    }

    //Création du token JWT avec id et name
    const payload = {
        sub: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    }

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, {expiresIn: "24h"});

    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
        token: token
    }
}

module.exports = {
    register,
    login,
}