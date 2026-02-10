const playlistRepository = require("../repositories/playlist.repository.js");

const getAllPlaylists = async () => {
    try {
        const playlists = await playlistRepository.findAllPlaylists();
        return playlists;
    } catch (error) {
        throw {
            status: 500,
            message: "Error retrieving playlists: " + error.message
        }
    }
}

const getPlaylistById = async (playlistId) => {
    try {
        const playlist = await playlistRepository.findPlaylistById(parseInt(playlistId));
        if (!playlist) {
            throw {
                status: 404,
                message: "❌ Playlist not found."
            }
        }
        return playlist;
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || "Error retrieving playlist"
        }
    }
}

const getPlaylistsByUserId = async (userId) => {
    try {
        const playlists = await playlistRepository.findPlaylistsByUserId(parseInt(userId));
        return playlists;
    } catch (error) {
        throw {
            status: 500,
            message: "Error retrieving playlists: " + error.message
        }
    }
}

const createPlaylist = async (playlistData, userId) => {
    try {
        if (!playlistData.name) {
            throw {
                status: 400,
                message: "❌ Playlist name is required."
            }
        }

        const playlist = await playlistRepository.createPlaylist({
            name: playlistData.name,
            description: playlistData.description || null,
            userId: userId,
        });
        return playlist;
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || "Error creating playlist"
        }
    }
}

// UPDATE playlist (seulement le propriétaire)
const updatePlaylist = async (playlistId, playlistData, userId) => {
    try {
        const playlist = await playlistRepository.findPlaylistById(parseInt(playlistId));
        if (!playlist) {
            throw {
                status: 404,
                message: "❌ Playlist not found."
            }
        }

        // Vérifier que l'utilisateur est le propriétaire
        if (playlist.userId !== userId) {
            throw {
                status: 403,
                message: "❌ You don't have permission to update this playlist."
            }
        }

        const updatedPlaylist = await playlistRepository.updatePlaylist(parseInt(playlistId), {
            name: playlistData.name || playlist.name,
            description: playlistData.description !== undefined ? playlistData.description : playlist.description,
        });
        return updatedPlaylist;
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || "Error updating playlist"
        }
    }
}

// DELETE playlist (seulement le propriétaire)
const deletePlaylist = async (playlistId, userId) => {
    try {
        const playlist = await playlistRepository.findPlaylistById(parseInt(playlistId));
        if (!playlist) {
            throw {
                status: 404,
                message: "❌ Playlist not found."
            }
        }

        // Vérifier que l'utilisateur est le propriétaire
        if (playlist.userId !== userId) {
            throw {
                status: 403,
                message: "❌ You don't have permission to delete this playlist."
            }
        }

        await playlistRepository.deletePlaylist(parseInt(playlistId));
        return {
            message: "✅ Playlist deleted successfully."
        }
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || "Error deleting playlist"
        }
    }
}

// ADD album to playlist (seulement le propriétaire)
const addAlbumToPlaylist = async (playlistId, albumId, userId) => {
    try {
        const playlist = await playlistRepository.findPlaylistById(parseInt(playlistId));
        if (!playlist) {
            throw {
                status: 404,
                message: "❌ Playlist not found."
            }
        }

        // Vérifier que l'utilisateur est le propriétaire
        if (playlist.userId !== userId) {
            throw {
                status: 403,
                message: "❌ You don't have permission to modify this playlist."
            }
        }

        // Vérifier que l'album existe
        const album = await playlistRepository.findAlbumById ? await playlistRepository.findAlbumById(parseInt(albumId)) : null;
        if (!album) {
            // Faire une vérification directe avec Prisma
            const prisma = require("../config/prisma-client.js");
            const albumCheck = await prisma.album.findUnique({
                where: { id: parseInt(albumId) }
            });
            if (!albumCheck) {
                throw {
                    status: 404,
                    message: "❌ Album not found."
                }
            }
        }

        // Vérifier que l'album n'est pas déjà dans la playlist
        const existingAlbum = playlist.albums.find(pa => pa.albumId === parseInt(albumId));
        if (existingAlbum) {
            throw {
                status: 409,
                message: "❌ Album already in playlist."
            }
        }

        await playlistRepository.addAlbumToPlaylist(parseInt(playlistId), parseInt(albumId));
        return await playlistRepository.findPlaylistById(parseInt(playlistId));
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || "Error adding album to playlist"
        }
    }
}

// REMOVE album from playlist (seulement le propriétaire)
const removeAlbumFromPlaylist = async (playlistId, albumId, userId) => {
    try {
        const playlist = await playlistRepository.findPlaylistById(parseInt(playlistId));
        if (!playlist) {
            throw {
                status: 404,
                message: "❌ Playlist not found."
            }
        }

        // Vérifier que l'utilisateur est le propriétaire
        if (playlist.userId !== userId) {
            throw {
                status: 403,
                message: "❌ You don't have permission to modify this playlist."
            }
        }

        // Vérifier que l'album est dans la playlist
        const existingAlbum = playlist.albums.find(pa => pa.albumId === parseInt(albumId));
        if (!existingAlbum) {
            throw {
                status: 404,
                message: "❌ Album not found in playlist."
            }
        }

        await playlistRepository.removeAlbumFromPlaylist(parseInt(playlistId), parseInt(albumId));
        return await playlistRepository.findPlaylistById(parseInt(playlistId));
    } catch (error) {
        throw {
            status: error.status || 500,
            message: error.message || "Error removing album from playlist"
        }
    }
}

module.exports = {
    getAllPlaylists,
    getPlaylistById,
    getPlaylistsByUserId,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    addAlbumToPlaylist,
    removeAlbumFromPlaylist,
}

