const authController = require('../controllers/authController')
const { validateBody } = require('../utils/utils')

/**
 * Login route
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @param {Object} context
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 */
exports.login = async (event, context) => {
    const validatedBody = validateBody({
        username: 'string',
        password: 'string'
    }, event.body)

    if(validatedBody.length > 0) {
        return {
            statusCode: 422,
            body: JSON.stringify(validatedBody)
        }
    }

    return authController.login(event.body.username, event.body.password)
}


/**
 * Register route
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @param {Object} context
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 */
exports.register = async (event, context) => {
    const validatedBody = validateBody({
        username: 'string',
        password: 'string',
        email: 'string'
    }, event.body)

    if(validatedBody.length > 0) {
        return {
            statusCode: 422,
            body: JSON.stringify(validatedBody)
        }
    }

    return authController.register(event.body.username, event.body.email, event.body.password)
}