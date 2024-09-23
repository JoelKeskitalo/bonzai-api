const { dynamoDb } = require('../../database/db')

module.exports.handler = async (event) => {
    try {
        const roomsParams = {
            TableName: 'Bonzai-Rooms',
        }

        const result = await dynamoDb.scan(roomsParams)
        const allRooms = result.Items

        if(!allRooms) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'There are no rooms in the database'})
            }
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify({ message: `All rooms in the database: ${allRooms}`})
        }

        return response

    } catch(error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        }
    }
}