const express = require('express');
const playlistController = require('../controllers/playlist.controller.js');
const { authMiddleware } = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.get('/', playlistController.getAllPlaylists);
router.get('/user-playlist', authMiddleware, playlistController.getMyPlaylists);
router.get('/:id', playlistController.getPlaylistById);
router.post('/', authMiddleware, playlistController.createPlaylist);
router.put('/:id', authMiddleware, playlistController.updatePlaylist);
router.delete('/:id', authMiddleware, playlistController.deletePlaylist);
router.post('/:id/albums/:albumId', authMiddleware, playlistController.addAlbumToPlaylist);
router.delete('/:id/albums/:albumId', authMiddleware, playlistController.removeAlbumFromPlaylist);

module.exports = router;

