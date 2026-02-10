const express = require('express');
const artistController = require('../controllers/artiste.controller.js');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.get('/', artistController.getAllArtists);
router.get('/:id', artistController.getArtistById);
router.post('/', authMiddleware, adminMiddleware, artistController.createArtist);
router.put('/:id', authMiddleware, adminMiddleware, artistController.updateArtist);
router.delete('/:id', authMiddleware, adminMiddleware, artistController.deleteArtist);

module.exports = router;

