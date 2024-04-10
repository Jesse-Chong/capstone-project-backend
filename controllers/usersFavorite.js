const express = require("express")
const usersFavorites = express.Router()
const {    getUserFavorites, addUserFavorite,removeUserFavorite} = require("../queries/userFavorites")


usersFavorites.get("/:userId", async (req, res) =>{
    const {userId} = req.params
    const userFavorites = await getUserFavorites(userId)
    res.status(200).json(userFavorites)
})

usersFavorites.post("/", async (req, res) =>{
    const {user_id, favorite_id} = req.body
    const addedFavorite = await addUserFavorite(user_id, favorite_id)
    res.status(200).json(addedFavorite)
})

usersFavorites.delete("/:userId/:favoriteId", async (req, res) =>{
    const {userId, favoriteId} = req.params
    const deletedFavorite = await removeUserFavorite(userId, favoriteId)
    res.status(200).json(deletedFavorite)
})



module.exports = usersFavorites