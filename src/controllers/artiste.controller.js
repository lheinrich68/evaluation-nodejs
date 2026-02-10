const artistService = require("../services/artiste.service.js");

const getAllArtists = async (req, res) => {
    try {
        const artists = await artistService.getAllArtists();
        res.status(200).json({
            message: "Artists retrieved successfully",
            data: artists
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error retrieving artists"
        });
    }
}

const getArtistById = async (req, res) => {
    try {
        const { id } = req.params;
        const artist = await artistService.getArtistById(id);
        res.status(200).json({
            message: "Artist retrieved successfully",
            data: artist
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error retrieving artist"
        });
    }
}

const createArtist = async (req, res) => {
    try {
        const artist = await artistService.createArtist(req.body);
        res.status(201).json({
            message: "Artist created successfully",
            data: artist
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error creating artist"
        });
    }
}

const updateArtist = async (req, res) => {
    try {
        const { id } = req.params;
        const artist = await artistService.updateArtist(id, req.body);
        res.status(200).json({
            message: "Artist updated successfully",
            data: artist
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error updating artist"
        });
    }
}

const deleteArtist = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await artistService.deleteArtist(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error deleting artist"
        });
    }
}

module.exports = {
    getAllArtists,
    getArtistById,
    createArtist,
    updateArtist,
    deleteArtist,
}

