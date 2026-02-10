const prisma = require("../config/prisma-client.js");

const findAllArtists = async () => {
    return await prisma.artist.findMany({
        include: {
            albums: true
        }
    });
}

const findArtistById = async (artistId) => {
    return await prisma.artist.findUnique({
        where: {
            id: artistId
        },
        include: {
            albums: true
        }
    });
}

const createArtist = async (artistData) => {
    return await prisma.artist.create({
        data: {
            name: artistData.name,
            bio: artistData.bio,
            photoUrl: artistData.photoUrl,
        },
        include: {
            albums: true
        }
    });
}

const updateArtist = async (artistId, artistData) => {
    return await prisma.artist.update({
        where: {
            id: artistId
        },
        data: {
            name: artistData.name,
            bio: artistData.bio,
            photoUrl: artistData.photoUrl,
        },
        include: {
            albums: true
        }
    });
}

const deleteArtist = async (artistId) => {
    return await prisma.artist.delete({
        where: {
            id: artistId
        }
    });
}

module.exports = {
    findAllArtists,
    findArtistById,
    createArtist,
    updateArtist,
    deleteArtist,
}
