const petsRoutes = require('./routes/pets')

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

        switch (event.httpMethod) {
            case 'DELETE':
                return petsRoutes.delete(event, context)
            case 'GET':
                if(event.pathParameters) return petsRoutes.getById(event, context)

                return petsRoutes.get(event, context)
            case 'POST':
                return petsRoutes.create(event, context)
            case 'PUT':
                return petsRoutes.update(event, context)
            default:
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
