const dotenv = require("dotenv");
const express = require('express');
dotenv.config();

const app = express();
app.use(express.json());

//Utilisation des routers
//TODO: Mettre en place des routeurs

//Lancement du serveur sur le port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`🟢 Server started on http://localhost:${PORT}`);
})