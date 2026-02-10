const express = require('express');
const albumController = require('../controllers/album.controller.js');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.get('/', albumController.getAllAlbums);
router.get('/artist/:artistId', albumController.getAlbumsByArtistId);
router.get('/:id', albumController.getAlbumById);
router.post('/', authMiddleware, adminMiddleware, albumController.createAlbum);
router.put('/:id', authMiddleware, adminMiddleware, albumController.updateAlbum);
router.delete('/:id', authMiddleware, adminMiddleware, albumController.deleteAlbum);

module.exports = router;

