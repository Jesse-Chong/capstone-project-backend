const db = require("../db/dbConfig")
const bcrypt = require("bcrypt")

const createUser = async (user) => {
    try {
       const {first_name, last_name, email, password_hash} = user
       const salt = 10
       const hash = await bcrypt.hash(password_hash, salt)
       const newUser = await db.one("INSERT INTO users (first_name, last_name, email, password_hash) VALUES($1, $2, $3, $4) RETURNING *", [first_name, last_name, email, hash])
       return newUser
    } catch (error) {
        return error
    }
}

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
        const loggedInUser = await db.oneOrNone("SELECT * FROM users WHERE email=$1", user.email)
        if(!loggedInUser){
            return false
        }
        const passwordMatch = await bcrypt.compare(user.password_hash, loggedInUser.password_hash)
        if(!passwordMatch){
            return false
        }
        return loggedInUser
    } catch (error) {
        return error
    }
}


module.exports = {
    createUser,
    getUsers,
    logInUser
}