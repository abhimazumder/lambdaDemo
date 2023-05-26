'use strict'

const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.handle = async (event) => {
    let responseBody = "";
    let statusCode = 0;

    try {
        const id = event.id;

        if (!id) {
            throw new Error("ID not provided");
        }

        const params = {
            TableName: "address-book-dev-addressBook-WUJJXG56JLVJ",
            Key: {
                id: id,
            },
        }

        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    }
    catch(err){
        responseBody = `Unable to delete address: ${err.message}`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                responseBody: responseBody,
                input: event
            },
            null,
            2
        )
    };

    return response;
}