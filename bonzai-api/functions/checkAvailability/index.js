const { dynamoDb } = require('../../database/db')

module.exports.handler = async (event) => {
    try {
        const { roomId } = event.pathParameters

        if (!roomId) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Please fill in the required room id'
                })
            }
        }

        const roomParams = {
            TableName: 'Bonzai-Rooms',
            Key: { roomId }
        }

        const result = await dynamoDb.get(roomParams)
        const room = result.Item

        if (!room) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Could not find the room in the database'})
            }
        }

        const availableRoom = room.available === true

        return {
            statusCode: 200,
            body: JSON.stringify({
                available: availableRoom
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