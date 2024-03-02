const {neon} = require('@neondatabase/serverless');
const {getDatabaseUrl} = require("../lib/secrets");
const {drizzle} = require('drizzle-orm/neon-http');

async function getDbClient() {
    const dbUrl = await getDatabaseUrl();
    return neon(dbUrl);
}

async function getDrizzleDbClient() {
    const sql = await getDbClient();
    return drizzle(sql);
}


module.exports = {
    getDbClient,
    getDrizzleDbClient
}