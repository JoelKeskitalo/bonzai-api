const { dynamoDb } = require('../../database/db')

module.exports.handler = async (event) => {
    try {

        const { guestId } = event.pathParameters

        if (!guestId ) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'Please fill in a valid user id'
                })
            }
        }

        const guestParams = {
            TableName: 'Bonzai-Guest',
            Key: guestId
        }

        const result = await dynamoDb.scan(guestParams)
        const guestInfo = result.Items

        if(!guestInfo) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'Could not find the guest in the database'
                })
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Guest found: ',
                guest: guestInfo
            })
        }


    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        }
    }
}