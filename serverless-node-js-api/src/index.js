const serverless = require("serverless-http");
const express = require("express");
const { neon, neonConfig } = require('@neondatabase/serverless');
const AWS = require('aws-sdk');

const DATABASE_URL_SSM_PARAM = process.env.DATABASE_URL_SSM_PARAM
const AWS_REGION = process.env.AWS_REGION
const app = express();
const ssm = new AWS.SSM({ region: AWS_REGION });
async function dbClient(params) {
  const dbUrl = await ssm.getParameter({ Name: DATABASE_URL_SSM_PARAM, WithDecryption: true }).promise();
  // Enable connection caching
  // This will cache the connection for the duration of the lambda execution
  // non-pooling
  neonConfig.fetchConnectionCache = true;
  return neon(dbUrl.Parameter.Value);
}

app.get("/", async (req, res, next) => {
  const sql = await dbClient();

  const [dbResult] = await sql`select now()`;
  return res.status(200).json({
    message: "Hello from root!",
    result: (Date.now() - dbResult.now.getTime()) / 1000,
  });
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);