const { dynamoDb } = require('../../database/db')

module.exports.handler = async (event) => {
    try {
        const { roomId } = JSON.parse(event.body)

        if(!roomId) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Invalid room id'
                })
            }
        }
        
        const roomParams = {
            TableName: 'Bonzai-Rooms',
            Key: {
                roomId
            }
        }

        const result = await dynamoDb.get(roomParams)
        const room = result.Item



        if(!room || room.roomId !== roomId) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'The room ID you searched for does not match any room ID in the database'
                })
            }
        }

        const newStatus = !room.available

        const updateParams = {
            TableName: 'Bonzai-Rooms',
            Key: { roomId },
            UpdateExpression: 'SET #available = :newStatus',
            ExpressionAttributeNames: {
                '#available': 'available'
            },
            ExpressionAttributeValues: {
                'newStatus': newStatus
            },
            ReturnValues: 'ALL_NEW'
        }

        const updatedRoom = await dynamoDb.update(updateParams)

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'The rooms availability status has been updated.',
                updatedRoom: updatedRoom.Attributes
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