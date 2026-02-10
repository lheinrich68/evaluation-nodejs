const albumService = require("../services/album.service.js");

const getAllAlbums = async (req, res) => {
    try {
        const albums = await albumService.getAllAlbums();
        res.status(200).json({
            message: "Albums retrieved successfully",
            data: albums
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error retrieving albums"
        });
    }
}

const getAlbumById = async (req, res) => {
    try {
        const { id } = req.params;
        const album = await albumService.getAlbumById(id);
        res.status(200).json({
            message: "Album retrieved successfully",
            data: album
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error retrieving album"
        });
    }
}

const getAlbumsByArtistId = async (req, res) => {
    try {
        const { artistId } = req.params;
        const albums = await albumService.getAlbumsByArtistId(artistId);
        res.status(200).json({
            message: "Albums retrieved successfully",
            data: albums
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error retrieving albums"
        });
    }
}

const createAlbum = async (req, res) => {
    try {
        const album = await albumService.createAlbum(req.body);
        res.status(201).json({
            message: "Album created successfully",
            data: album
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error creating album"
        });
    }
}

const updateAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const album = await albumService.updateAlbum(id, req.body);
        res.status(200).json({
            message: "Album updated successfully",
            data: album
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error updating album"
        });
    }
}

const deleteAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await albumService.deleteAlbum(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error deleting album"
        });
    }
}

module.exports = {
    getAllAlbums,
    getAlbumById,
    getAlbumsByArtistId,
    createAlbum,
    updateAlbum,
    deleteAlbum,
}

