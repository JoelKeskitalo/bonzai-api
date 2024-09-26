const { dynamoDb } = require('../../database/db')

module.exports.handler = async (event) => {
    try {
        const guestParams = {
            TableName: 'Bonzai-Guest'
        }

        const result = await dynamoDb.scan(guestParams)
        const allGuests = result.Items

        if(!allGuests) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: 'No guests found in the database'
                })
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'All guests found in the database: ',
                guests: allGuests
            })
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(({ error: error.message }))
        }
    }
}