const { neon } = require('@neondatabase/serverless');
const { getDatabaseUrl } = require("../lib/secrets");

async function getDbClient() {
    const dbUrl = await getDatabaseUrl();
    return neon(dbUrl);
}

module.exports = {
    getDbClient
}