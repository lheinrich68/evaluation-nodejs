const albumRepository = require("../repositories/album.repository.js");

const getAllAlbums = async () => {
    try {
        const albums = await albumRepository.findAllAlbums();
        return albums;
    } catch (error) {
        throw {
            status: 500,
            message: "Error retrieving albums: " + error.message
        }
    }
}

const getAlbumById = async (albumId) => {
    try {
        const album = await albumRepository.findAlbumById(parseInt(albumId));
        if (!album) {
            throw {
                status: 404,
                message: "❌ Album not found."
            }
        }
        return album;
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || "Error retrieving album"
        }
    }
}

const getAlbumsByArtistId = async (artistId) => {
    try {
        const albums = await albumRepository.findAlbumsByArtistId(parseInt(artistId));
        return albums;
    } catch (error) {
        throw {
            status: 500,
            message: "Error retrieving albums: " + error.message
        }
    }
}

const createAlbum = async (albumData) => {
    try {
        if (!albumData.title || !albumData.releaseDate || !albumData.artistId) {
            throw {
                status: 400,
                message: "❌ Title, release date, and artist ID are required."
            }
        }

        const album = await albumRepository.createAlbum({
            title: albumData.title,
            description: albumData.description || null,
            releaseDate: albumData.releaseDate,
            coverUrl: albumData.coverUrl || null,
            artistId: parseInt(albumData.artistId),
        });
        return album;
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || "Error creating album"
        }
    }
}

const updateAlbum = async (albumId, albumData) => {
    try {
        const album = await albumRepository.findAlbumById(parseInt(albumId));
        if (!album) {
            throw {
                status: 404,
                message: "❌ Album not found."
            }
        }

        const updatedAlbum = await albumRepository.updateAlbum(parseInt(albumId), {
            title: albumData.title || album.title,
            description: albumData.description !== undefined ? albumData.description : album.description,
            releaseDate: albumData.releaseDate || album.releaseDate,
            coverUrl: albumData.coverUrl !== undefined ? albumData.coverUrl : album.coverUrl,
            artistId: albumData.artistId ? parseInt(albumData.artistId) : album.artistId,
        });
        return updatedAlbum;
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || "Error updating album"
        }
    }
}

const deleteAlbum = async (albumId) => {
    try {
        const album = await albumRepository.findAlbumById(parseInt(albumId));
        if (!album) {
            throw {
                status: 404,
                message: "❌ Album not found."
            }
        }

        await albumRepository.deleteAlbum(parseInt(albumId));
        return {
            message: "✅ Album deleted successfully."
        }
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || "Error deleting album"
        }
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

