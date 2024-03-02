##    

let's add the drizzle client

```javascript
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
```

let's create a crud file

```javascript
const {getDrizzleDbClient} = require("./clients");
const {LeadTable} = require('../db/schemas');
const {desc, eq} = require("drizzle-orm");

async function newLead(email) {
    const db = await getDrizzleDbClient();
    const dbResult = await db.insert(LeadTable)
        .values({email: email})
        .returning();
    if (dbResult?.length === 1) {
        return dbResult[0];
    }
    return dbResult;
}

async function getLeads() {
    const db = await getDrizzleDbClient();
    return db.select().from(LeadTable).limit(10).orderBy(desc(LeadTable.createdAt));
}

async function getLeadById(id) {
    const db = await getDrizzleDbClient();
    const dbResult = await db.select().from(LeadTable).where(eq(LeadTable.id, id));

    if (dbResult?.length === 1) {
        return dbResult[0];
    }
    return null;
}

module.exports = {
    newLead,
    getLeads,
    getLeadById
}
```

let's use the crud methods in the handler

```javascript
const serverless = require("serverless-http");
const express = require("express");
const {getDbClient} = require("./db/clients");
const {getLeads, newLead, getLeadById} = require("./db/crud");


const app = express();
app.use(express.json());

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

app.get("/leads", async (req, res, next) => {
    const data = await getLeads();
    return res.status(200).json({
        data
    });
});

app.get("/leads/:id", async (req, res, next) => {
    const {id} = req.params;
    const data = await getLeadById(id);
    return res.status(200).json({
        data
    });
});
app.post("/leads", async (req, res, next) => {
    const {email} = req.body;
    const savedLead = await newLead(email);
    return res.status(200).json({
        message: "Hello from path!",
        data: savedLead,
    });
});
app.use((req, res, next) => {
    return res.status(404).json({
        error: "Not Found",
    });
});

module.exports.handler = serverless(app);
```