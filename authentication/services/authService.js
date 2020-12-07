const { Users } = require('../models/Users')
const { v4 } = require('uuid')

/**
 * Get user by username
 *
 * @param username
 * @returns {object}
 */
exports.getUserByUsername = async (username) => {
    const users = await Users.scan('username').contains(username).exec()
    return users.length > 0 ? users[0] : null
}

/**
 * Save user
 *
 * @param {object} userData
 * @returns {object}
 */
exports.saveUser = async (userData) => {
    userData.id = v4()
    const user = new Users(userData)
    await user.save()

    return user
}