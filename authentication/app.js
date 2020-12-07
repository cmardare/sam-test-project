const authRoutes = require('./routes/auth')

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        if (event.body) event.body = JSON.parse(event.body)

        if (event.httpMethod === "POST" && event.path === "/register") {
            return authRoutes.register(event, context)
        } else if (event.httpMethod === "POST" && event.path === "/login") {
            return authRoutes.login(event, context)
        } else {
            return {
                statusCode: 404,
                body: "Not found"
            }
        }

    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: err.message
        };
    }
};
