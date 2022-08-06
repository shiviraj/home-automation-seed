const {MongoClient} = require('mongodb');
const {csvImporter} = require("./importer");

const url = process.env.MONGODB_URL + "?retryWrites=true&writeConcern=majority"
const client = new MongoClient(url);

const dbName = 'home-automation';

const main = async () => {
    const db = client.db(dbName);
    await csvImporter(db, "devices.csv", "devices")
    return 'done.';
};

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());