const { dynamoDb } = require('../../database/db')

module.exports.handler = async (event) => {
    try {
        const { roomId } = event.pathParameters

        if (!roomId) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Missing room id'})
            }
        }

        const roomParams = {
            TableName: 'Bonzai-Rooms',
            FilterExpression: 'roomId = :roomId',
            ExpressionAttributeValues: {
                ':roomId': roomId
            }
        }

        const result = await dynamoDb.scan(roomParams)
        const oneRoom = result.Items

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Room found: ',
                room: oneRoom
            })
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message
            })
        }
    }
}