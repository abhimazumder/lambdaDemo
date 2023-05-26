'use strict';

const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.handle = async (event) => {
    let responseBody = '';
    let statusCode = 0;

    try {
        const { id, attribute, value } = JSON.parse(event.body);

        if (!id || !attribute || !value) {
            throw new Error('Invalid request: some fields are missing.');
        }

        const params = {
            TableName: 'address-book-dev-addressBook-WUJJXG56JLVJ',
            Key: {
                id: id,
            },
            UpdateExpression: `set ${attribute} = :${attribute}`,
            ExpressionAttributeValues: {
                [`:${attribute}`]: value,
            },
            ReturnValues: 'UPDATED_NEW',
        };

        const data = await documentClient.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 200;
    } catch (err) {
        responseBody = `Unable to update address: ${err.message}`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                responseBody: responseBody,
                input: event,
            },
            null,
            2
        ),
    };

    return response;
};
