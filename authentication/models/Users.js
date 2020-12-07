const db = require('dynamoose')

const tableName = process.env.USERS_TABLE

exports.Users = db.model(tableName, new db.Schema({
        id: 'string',
        username: 'string',
        email: 'string',
        passwordHash: 'string',
        salt: 'string'
    }, { create: false })
)
