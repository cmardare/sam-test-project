const petsController = require('../controllers/petsController')
const authMiddleware = require('../middlewares/authMiddleware')
const { validateBody } = require('../utils/utils')

/**
 * Get pets route
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @param {Object} context
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 */
exports.get = async (event, context) => {
    const user = await authMiddleware.validateJWT(event.headers['Authorization'])
    if (user.statusCode) return user


    return petsController.get()
}

/**
 * Get pets by id route
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @param {Object} context
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 */
exports.getById = async (event, context) => {
    const user = await authMiddleware.validateJWT(event.headers['Authorization'])
    if (user.statusCode) return user

    return petsController.getById(event.pathParameters.id)
}

/**
 * Create pet route
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @param {Object} context
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 */
exports.create = async (event, context) => {
    const user = await authMiddleware.validateJWT(event.headers['Authorization'])
    if (user.statusCode) return user

    const validatedBody = validateBody({
        name: 'string',
        age: 'number',
        type: 'string'
    }, event.body)

    if(validatedBody.length > 0) {
        return {
            statusCode: 422,
            body: JSON.stringify(validatedBody)
        }
    }

    return petsController.create(event.body, user)
}

/**
 * Update pet by id route
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @param {Object} context
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 */
exports.update = async (event, context) => {
    const user = await authMiddleware.validateJWT(event.headers['Authorization'])
    if (user.statusCode) return user

    const validatedBody = validateBody({
        name: 'string',
        age: 'number',
        type: 'string'
    }, event.body)

    if(validatedBody.length > 0) {
        return {
            statusCode: 422,
            body: JSON.stringify(validatedBody)
        }
    }

    return petsController.update(event.pathParameters.id, event.body, user)
}

/**
 * Delete pet by id route
 *
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @param {Object} context
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 */
exports.delete = async (event, context) => {
    const user = await authMiddleware.validateJWT(event.headers['Authorization'])
    if (user.statusCode) return user


    return petsController.delete(event.pathParameters.id)
}