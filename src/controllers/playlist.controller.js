const playlistService = require("../services/playlist.service.js");

const getAllPlaylists = async (req, res) => {
    try {
        const playlists = await playlistService.getAllPlaylists();
        res.status(200).json({
            message: "Playlists retrieved successfully",
            data: playlists
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error retrieving playlists"
        });
    }
}

const getPlaylistById = async (req, res) => {
    try {
        const { id } = req.params;
        const playlist = await playlistService.getPlaylistById(id);
        res.status(200).json({
            message: "Playlist retrieved successfully",
            data: playlist
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error retrieving playlist"
        });
    }
}

const getMyPlaylists = async (req, res) => {
    try {
        const userId = req.user.sub;
        const playlists = await playlistService.getPlaylistsByUserId(userId);
        res.status(200).json({
            message: "Your playlists retrieved successfully",
            data: playlists
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error retrieving your playlists"
        });
    }
}

const createPlaylist = async (req, res) => {
    try {
        const userId = req.user.sub;
        const playlist = await playlistService.createPlaylist(req.body, userId);
        res.status(201).json({
            message: "Playlist created successfully",
            data: playlist
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error creating playlist"
        });
    }
}

const updatePlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.sub;
        const playlist = await playlistService.updatePlaylist(id, req.body, userId);
        res.status(200).json({
            message: "Playlist updated successfully",
            data: playlist
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error updating playlist"
        });
    }
}

const deletePlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.sub;
        const result = await playlistService.deletePlaylist(id, userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error deleting playlist"
        });
    }
}

const addAlbumToPlaylist = async (req, res) => {
    try {
        const { id, albumId } = req.params;
        const userId = req.user.sub;
        const playlist = await playlistService.addAlbumToPlaylist(id, albumId, userId);
        res.status(200).json({
            message: "Album added to playlist successfully",
            data: playlist
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error adding album to playlist"
        });
    }
}

const removeAlbumFromPlaylist = async (req, res) => {
    try {
        const { id, albumId } = req.params;
        const userId = req.user.sub;
        const playlist = await playlistService.removeAlbumFromPlaylist(id, albumId, userId);
        res.status(200).json({
            message: "Album removed from playlist successfully",
            data: playlist
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error removing album from playlist"
        });
    }
}

module.exports = {
    getAllPlaylists,
    getPlaylistById,
    getMyPlaylists,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    addAlbumToPlaylist,
    removeAlbumFromPlaylist,
}

