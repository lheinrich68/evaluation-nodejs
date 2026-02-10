const prisma = require("../config/prisma-client.js");

const findAllAlbums = async () => {
    return await prisma.album.findMany({
        include: {
            artist: true,
            playlists: true
        }
    });
}

const findAlbumById = async (albumId) => {
    return await prisma.album.findUnique({
        where: {
            id: albumId
        },
        include: {
            artist: true,
            playlists: true
        }
    });
}

const findAlbumsByArtistId = async (artistId) => {
    return await prisma.album.findMany({
        where: {
            artistId: artistId
        },
        include: {
            artist: true,
            playlists: true
        }
    });
}

const createAlbum = async (albumData) => {
    return await prisma.album.create({
        data: {
            title: albumData.title,
            description: albumData.description,
            releaseDate: new Date(albumData.releaseDate),
            coverUrl: albumData.coverUrl,
            artistId: albumData.artistId,
        },
        include: {
            artist: true,
            playlists: true
        }
    });
}

const updateAlbum = async (albumId, albumData) => {
    return await prisma.album.update({
        where: {
            id: albumId
        },
        data: {
            title: albumData.title,
            description: albumData.description,
            releaseDate: albumData.releaseDate ? new Date(albumData.releaseDate) : undefined,
            coverUrl: albumData.coverUrl,
            artistId: albumData.artistId,
        },
        include: {
            artist: true,
            playlists: true
        }
    });
}

const deleteAlbum = async (albumId) => {
    return await prisma.album.delete({
        where: {
            id: albumId
        }
    });
}

module.exports = {
    findAllAlbums,
    findAlbumById,
    findAlbumsByArtistId,
    createAlbum,
    updateAlbum,
    deleteAlbum,
}

