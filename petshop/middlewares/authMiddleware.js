const JWT = require('jsonwebtoken')

/**
 * Throw message in case of error
 *
 * @param {number} httpCode
 * @param {string} message
 * @return {{body: *, statusCode: *}}
 */
function throwErrorMessage (httpCode, message){
    return {
        statusCode: httpCode,
        body: JSON.stringify({
            message
        })
    }
}

/**
 * Verify jsonwebtoken validity
 *
 * @param {string} token
 * @return {Promise<*>}
 */
exports.validateJWT = async (token) => {
    if(!token) return throwErrorMessage(401, 'Unauthorized')

    return JWT.verify(token.split(' ')[1], process.env.AUTH_SECRET_KEY)
}
