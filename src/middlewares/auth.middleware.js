const jwt = require("jsonwebtoken");
require("dotenv").config()

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw {
                status: 401,
                message: "❌ Invalid Token.",
            }
        }

        const token = authHeader.substring(7); // Récupérer le token après "Bearer "
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodeToken) {
            throw {
                status: 401,
                message: "❌ Invalid Token.",
            }
        }

        // Ajouter les données du token à la requête
        req.user = decodeToken;
        next();
    } catch (error) {
        res.status(error.status || 401).json({message: error.message || "Invalid Token"});
    }
};

const adminMiddleware = (req, res, next) => {
    try {
        if (!req.user) {
            throw {
                status: 401,
                message: "❌ User not authenticated.",
            }
        }

        // Vérifier que le rôle est ADMIN
        if (req.user.role !== "ADMIN") {
            throw {
                status: 403,
                message: "❌ Admin access required.",
            }
        }

        next();
    } catch (error) {
        res.status(error.status || 403).json({message: error.message || "Forbidden"});
    }
};

module.exports = {
    authMiddleware,
    adminMiddleware
};
