const jwt = require('jsonwebtoken')
const { randomBytes, pbkdf2Sync } = require('crypto')

const authService = require('../services/authService')

/**
 * Login functionality
 *
 * @param {string} username
 * @param {string} password
 * @returns {object}
 */
exports.login = async (username, password) => {
    const user = await authService.getUserByUsername(username)
    if(!user) return {
        statusCode: 401,
        body: JSON.stringify({
            message: "Authentication failed!"
        })
    }

    const hash = pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex')
    if(hash !== user.passwordHash) return {
        statusCode: 401,
        body: JSON.stringify({
            message: "Authentication failed!"
        })
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            token: jwt.sign({
                id: user.id,
                email: user.email,
                username: user.username
            }, process.env.AUTH_SECRET_KEY, {
                expiresIn: '1d'
            })
        })
    }
}

/**
 * Register functionality
 *
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {object}
 */
exports.register = async (username, email, password) => {
    const userExists = await authService.getUserByUsername(username)
    if(userExists) return {
        statusCode: 403,
        body: JSON.stringify({
            message: "User already exists!"
        })
    }

    const salt = randomBytes(16).toString('hex')
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

    const user = await authService.saveUser({
        username,
        email,
        passwordHash: hash,
        salt: salt
    })

    return {
        statusCode: 200,
        body: JSON.stringify({
            token: jwt.sign({
                id: user.id, email, username
            }, process.env.AUTH_SECRET_KEY, {
                expiresIn: '1d'
            })
        })
    }
}