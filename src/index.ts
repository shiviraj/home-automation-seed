import {PiClient} from "raspberrypi-db";
import {csvImporter} from "./importer";

const url: string = process.env.DB_URL!
const databaseName: string = process.env.DB_NAME!

const main = async () => {
    const piClient = new PiClient(url);
    await piClient.connect()
    const db = piClient.db(databaseName);
    await csvImporter(db, "devices.csv", "devices")
    return "done"
}

main().then(console.log).catch(console.error)