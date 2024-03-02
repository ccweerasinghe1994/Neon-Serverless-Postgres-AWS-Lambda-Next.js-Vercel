const serverless = require("serverless-http");
const express = require("express");
const AWS = require('aws-sdk');
const { getDbClient } = require("./db/clients");


const app = express();


app.get("/", async (req, res, next) => {
  const sql = await getDbClient();
  const now = Date.now();
  const [dbResult] = await sql`select now()`;
  return res.status(200).json({
    message: "Hello from root!",
    result: (dbResult.now.getTime() - now) / 1000 + " seconds",
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