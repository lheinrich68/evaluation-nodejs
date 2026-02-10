const prisma = require("../config/prisma-client.js");

const findAllPlaylists = async () => {
    return await prisma.playlist.findMany({
        include: {
            user: true,
            albums: {
                include: {
                    album: {
                        include: {
                            artist: true
                        }
                    }
                }
            }
        }
    });
}

const findPlaylistById = async (playlistId) => {
    return await prisma.playlist.findUnique({
        where: {
            id: playlistId
        },
        include: {
            user: true,
            albums: {
                include: {
                    album: {
                        include: {
                            artist: true
                        }
                    }
                }
            }
        }
    });
}

const findPlaylistsByUserId = async (userId) => {
    return await prisma.playlist.findMany({
        where: {
            userId: userId
        },
        include: {
            user: true,
            albums: {
                include: {
                    album: {
                        include: {
                            artist: true
                        }
                    }
                }
            }
        }
    });
}

const createPlaylist = async (playlistData) => {
    return await prisma.playlist.create({
        data: {
            name: playlistData.name,
            description: playlistData.description,
            userId: playlistData.userId,
        },
        include: {
            user: true,
            albums: {
                include: {
                    album: {
                        include: {
                            artist: true
                        }
                    }
                }
            }
        }
    });
}

const updatePlaylist = async (playlistId, playlistData) => {
    return await prisma.playlist.update({
        where: {
            id: playlistId
        },
        data: {
            name: playlistData.name,
            description: playlistData.description,
        },
        include: {
            user: true,
            albums: {
                include: {
                    album: {
                        include: {
                            artist: true
                        }
                    }
                }
            }
        }
    });
}

const deletePlaylist = async (playlistId) => {
    return await prisma.playlist.delete({
        where: {
            id: playlistId
        }
    });
}

const addAlbumToPlaylist = async (playlistId, albumId) => {
    return await prisma.playlistAlbum.create({
        data: {
            playlistId: playlistId,
            albumId: albumId,
        }
    });
}

const removeAlbumFromPlaylist = async (playlistId, albumId) => {
    return await prisma.playlistAlbum.delete({
        where: {
            playlistId_albumId: {
                playlistId: playlistId,
                albumId: albumId,
            }
        }
    });
}

module.exports = {
    findAllPlaylists,
    findPlaylistById,
    findPlaylistsByUserId,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    addAlbumToPlaylist,
    removeAlbumFromPlaylist,
}

