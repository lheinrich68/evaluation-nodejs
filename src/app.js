require("dotenv").config()
const express = require('express');
const authRouter = require("./routes/auth.route.js");
const userRouter = require("./routes/user.route.js");
const artistRouter = require("./routes/artiste.route.js");
const albumRouter = require("./routes/album.route.js");
const errorMiddleware = require("./middlewares/error.middleware.js");

const app = express();
app.use(express.json());

//Routeurs
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/artist", artistRouter)
app.use("/api/album", albumRouter)

// Middleware de gestion d'erreurs
app.use(errorMiddleware);

//Lancement du serveur sur le port indiqué
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`🟢 Server started on http://localhost:${PORT}`);
})