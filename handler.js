'use strict';

const { createRule } = require("./createRule");
const { disableRule } = require("./disableRule");
const { putTarget } = require("./putTarget");

module.exports.createRule = createRule
module.exports.putTarget = putTarget
module.exports.disableRule = disableRule

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};