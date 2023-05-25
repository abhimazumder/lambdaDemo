"use strict";

const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.handle = async (event) => {
    let responseBody = "";
    let statusCode = 0;

    try {
        // Parsing the event body and extracting the 'id' field
        const { id } = JSON.parse(event.body);

        // Validating the 'id' field
        if (!id) {
            throw new Error("Invalid request: 'id' field is missing.");
        }

        const params = {
            TableName: "address-book-dev-addressBook-WUJJXG56JLVJ",
            Key: {
                "id" : id
            }
        };

        const data = await documentClient.get(params).promise();
        responseBody = data;
        statusCode = 200;
    }
    catch (err) {
        responseBody = `Unable to get address: ${err}`;
        statusCode = 400;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                body: responseBody,
                input: event
            },
            null,
            2
        )
    };

    return response;
};
