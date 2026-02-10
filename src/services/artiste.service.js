const artistRepository = require("../repositories/artiste.repository.js");

const getAllArtists = async () => {
    try {
        const artists = await artistRepository.findAllArtists();
        return artists;
    } catch (error) {
        throw {
            status: 500,
            message: "Error retrieving artists: " + error.message
        }
    }
}

const getArtistById = async (artistId) => {
    try {
        const artist = await artistRepository.findArtistById(parseInt(artistId));
        if (!artist) {
            throw {
                status: 404,
                message: "❌ Artist not found."
            }
        }
        return artist;
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || "Error retrieving artist"
        }
    }
}

const createArtist = async (artistData) => {
    try {
        if (!artistData.name) {
            throw {
                status: 400,
                message: "❌ Artist name is required."
            }
        }

        const artist = await artistRepository.createArtist({
            name: artistData.name,
            bio: artistData.bio || null,
            photoUrl: artistData.photoUrl || null,
        });
        return artist;
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || "Error creating artist"
        }
    }
}

const updateArtist = async (artistId, artistData) => {
    try {
        const artist = await artistRepository.findArtistById(parseInt(artistId));
        if (!artist) {
            throw {
                status: 404,
                message: "❌ Artist not found."
            }
        }

        const updatedArtist = await artistRepository.updateArtist(parseInt(artistId), {
            name: artistData.name || artist.name,
            bio: artistData.bio !== undefined ? artistData.bio : artist.bio,
            photoUrl: artistData.photoUrl !== undefined ? artistData.photoUrl : artist.photoUrl,
        });
        return updatedArtist;
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || "Error updating artist"
        }
    }
}

const deleteArtist = async (artistId) => {
    try {
        const artist = await artistRepository.findArtistById(parseInt(artistId));
        if (!artist) {
            throw {
                status: 404,
                message: "❌ Artist not found."
            }
        }

        await artistRepository.deleteArtist(parseInt(artistId));
        return {
            message: "✅ Artist deleted successfully."
        }
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || "Error deleting artist"
        }
    }
}

module.exports = {
    getAllArtists,
    getArtistById,
    createArtist,
    updateArtist,
    deleteArtist,
}

