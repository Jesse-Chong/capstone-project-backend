const db = require("../db/dbConfig.js");

const getUserFavorites = async (userId) => {
    try {
       const userFavorites = await db.any("SELECT * from users_favorite JOIN favorite ON users_favorite.favorite_id = favorite.favorite_id WHERE user_id=$1", userId) 
       return userFavorites
    } catch (error) {
        return error
    }
}

const addUserFavorite = async (userId, favoriteId) => {
    try {
        const addedFavorite = await db.one("INSERT INTO users_favorite (user_id, favorite_id) VALUES ($1, $2) RETURNING * ", [userId, favoriteId])
        return addedFavorite
    } catch (error) {
       return error 
    }
}

const removeUserFavorite = async (userId, favoriteId) => {
    try {
        const removedFavorite = await db.one("DELETE FROM users_favorite WHERE user_id=$1 AND favorite_id=$2 RETURNING *", [userId, favoriteId])
        return removedFavorite
    } catch (error) {
       return error 
    }
}

module.exports = {
    getUserFavorites,
    addUserFavorite, 
    removeUserFavorite
}