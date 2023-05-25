"use strict";

const AWS = require("aws-sdk");
const uuid = require("uuid");

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.handle = async (event) => {
  let responseBody = "";
  let statusCode = 0;

  try {
    const { fullname, address, phone } = JSON.parse(event.body);

    if (!fullname || !address || !phone)
      throw new Error("Invalid request: some fields are missing.");

    const params = {
      TableName: "address-book-dev-addressBook-WUJJXG56JLVJ",
      Item: {
        id: uuid.v1(),
        fullname: fullname,
        address: address,
        phone: phone,
      },
    };
    
    const data = await documentClient.put(params).promise();
    responseBody = params.Item;
    statusCode = 201;
  } catch (err) {
    responseBody = `Unable to add address: ${err.message}`;
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
    ),
  };

  return response;
};
