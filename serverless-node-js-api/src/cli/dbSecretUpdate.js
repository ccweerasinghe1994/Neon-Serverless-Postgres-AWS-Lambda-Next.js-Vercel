// tsx src/cli/dbSecretUpdate.ts stage databaseUrl
const {putDatabaseUrl} = require("../lib/secrets");
require('dotenv').config();

const arguments = process.argv.slice(2);

if (arguments.length !== 2) {
    console.error("please add stage and databaseUrl as arguments");
    process.exit(1);
}

if (require.main === module) {

    const stage = arguments[0];
    const databaseUrl = arguments[1];
    console.log(`stage: ${stage}, databaseUrl: ${databaseUrl}`);

    putDatabaseUrl(stage, databaseUrl).then(value => {
        console.log(value);
        process.exit(0);
    }).catch((error) => {
        console.error(error);
        process.exit(1);
    });
}