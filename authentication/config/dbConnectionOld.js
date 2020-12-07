/**
 *
 * Deprecated functions below. Kept in case of future purposes!
 *
 */

const AWS = require('aws-sdk')

AWS.config.update({region: "eu-central-1" });

let dynamo = new AWS.DynamoDB.DocumentClient()

module.exports.initDynamoClient = newDynamo => {
    dynamo = newDynamo;
};

/**
 * Create new item
 *
 * @param {string} tableName
 * @param {object} item
 * @returns {Promise<PromiseResult<DocumentClient.PutItemOutput, AWSError>>}
 */
exports.createItem = (tableName, item) => {
    return dynamo
        .put({
            Item: item,
            TableName: tableName
        })
        .promise()
}

/**
 * Read item by id
 *
 * @param {string} tableName
 * @param {string} id
 * @returns {Promise<PromiseResult<DocumentClient.GetItemOutput, AWSError>>}
 */
exports.readItemById = (tableName, id) => {
    return dynamo
        .get({
            Key: {
                id
            },
            TableName: tableName
        })
        .promise()
}

/**
 * Read item by field
 *
 * @param {string} tableName
 * @param {string} field
 * @param {string} value
 * @returns {Promise<PromiseResult<DocumentClient.GetItemOutput, AWSError>>}
 */
exports.readItemByField = (tableName, field, value) => {
    const params = {
        KeyConditionExpression: `${field} = :f`,
        ExpressionAttributeValues: {
            ':f': value
        },
        TableName: tableName
    }

    return dynamo
        .get(params)
        .promise()
}

/**
 * Read all items
 *
 * @param {string} tableName
 * @returns {Promise<PromiseResult<DocumentClient.ScanOutput, AWSError>>}
 */
exports.readItems = (tableName) => {
    return dynamo
        .scan({
            TableName: tableName
        })
        .promise()
}

/**
 * Update item by id
 *
 * @param {string} tableName
 * @param {string} itemId
 * @param {string} paramsName
 * @param {object} paramsValue
 * @returns {Promise<PromiseResult<DocumentClient.UpdateItemOutput, AWSError>>}
 */
exports.updateItem = (tableName, id, paramsName, paramsValue) => {
    return dynamo
        .update({
            TableName: tableName,
            Key: {
                id
            },
            ConditionExpression: 'attribute_exists(itemId)',
            UpdateExpression: `set ${paramsName} = :v`,
            ExpressionAttributeValues: {
                ':v': paramsValue
            },
            ReturnValues: 'ALL_NEW'
        })
        .promise()
}

/**
 * Delete item by id
 *
 * @param {string} tableName
 * @param {string} itemId
 * @returns {Promise<PromiseResult<DocumentClient.DeleteItemOutput, AWSError>>}
 */
exports.deleteItem = (tableName,id) => {
    return dynamo
        .delete({
            Key: {
                id
            },
            TableName: tableName
        })
        .promise()
}