"use strict";

const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.handle = async (event) => {
  let responseBody = "";
  let statusCode = 0;

  try {
    const params = {
      TableName: "address-book-dev-addressBook-WUJJXG56JLVJ"
    };

    const data = await documentClient.scan(params).promise();
    responseBody = data.Items;
    statusCode = 200;
    
  } catch (err) {
    responseBody = `Unable to get addresses: ${err.message}`;
    statusCode = 403;
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
