
const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");

const DATABASE_URL_SSM_PARAM = process.env.DATABASE_URL_SSM_PARAM;

const AWS_REGION = process.env.AWS_REGION;



async function getDatabaseUrl() {
    const client = new SSMClient({ region: AWS_REGION });
    const parameterData = { Name: DATABASE_URL_SSM_PARAM, WithDecryption: true };
    const command = new GetParameterCommand(parameterData);
    const response = await client.send(command);
    return response.Parameter.Value;
}

module.exports = { getDatabaseUrl };
