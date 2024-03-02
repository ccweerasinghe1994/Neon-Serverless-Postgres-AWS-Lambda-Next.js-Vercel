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