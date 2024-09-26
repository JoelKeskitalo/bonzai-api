const { dynamoDb } = require('../../database/db')
const { v4: uuidv4 } = require('uuid')

module.exports.handler = async (event) => {
    try {
        const { dateStaying, numGuests, roomType } = JSON.parse(event.body)

        if (!dateStaying || !numGuests || !roomType ) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Please fill in the required fields'
                })
            }
        }

        const bookingId = uuidv4()

        const bookingParams = {
            TableName: 'Bonzai-Bookings',
            Item: {
                bookingId,
                dateStaying,
                numGuests,
                roomType
            }
        }

        await dynamoDb.put(bookingParams)


        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Booking added to the database: ',
                booking: bookingId
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