const db = require("../db/dbConfig")
// Import library to hash password
const bcrypt = require("bcrypt")

const createUser = async (user) => {
    try {
       const {username, email, password_hash} = user
       const salt = 10
       const hash = await bcrypt.hash(password_hash, salt)
       const newUser = await db.one("INSERT INTO users (username, email, password_hash) VALUES($1, $2, $3) RETURNING *", [username, email, hash])
       return newUser
    } catch (error) {
        return error
    }
}

// GET all Users (only for development or Admin purposes)
const getUsers = async () => {
    try {
        const users = await db.any("SELECT * FROM users")
        return users  
    } catch (error) {
        return error
    }
}

const logInUser = async (user) => {
    try {
        const loggedInUser = await db.oneOrNone("SELECT * FROM users WHERE username=$1", user.username)
        if(!loggedInUser){
            return false
        }
        const passwordMatch = await bcrypt.compare(user.password_hash, loggedInUser.password_hash)
        if(!passwordMatch){
            return false
        }
        return loggedInUser
    } catch (error) {
        
    }
}


module.exports = {
    createUser,
    getUsers,
    logInUser
}