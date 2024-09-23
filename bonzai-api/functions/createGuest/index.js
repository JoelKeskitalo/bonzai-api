const { dynamoDb } = require('../../database/db')
const { v4: uuidv4 } = require('uuid') 

module.exports.handler = async (event) => {
    try {

        const { fullName, email, phoneNumber } = JSON.parse(event.body)

        if (!fullName || !email || !phoneNumber) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Please fill in the required fields'
                })
            }
        }


        const guestId = uuidv4()

        const guestParams = {
            TableName: 'Bonzai-Guest',
            Item: {
                guestId,
                fullName,
                email,
                phoneNumber
            }
        }

        await dynamoDb.put(guestParams)

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Guest user created successfully ',
                user: guestId
            })
        }


    } catch(error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message
            })
        }
    }
}