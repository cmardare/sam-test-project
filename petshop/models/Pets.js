const db = require('dynamoose')

const tableName = process.env.PETS_TABLE

exports.Pets = db.model(tableName, new db.Schema({
        id: 'string',
        name: 'string',
        age: 'number',
        type: 'string',
        createdBy: 'string',
        updatedBy: {
            type: 'string',
            default: ''
        }
    }, {
        create: false,
        timestamps: true
    })
)
