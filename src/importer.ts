import fs from "fs";

import path from "path";
import {DB} from "raspberrypi-db/lib/pi/db";

const csvImporter = async (db: DB, fileName: string, collectionName: string) => {
    const pathName = path.join(__dirname, `./resource/${fileName}`);
    const csvData = fs.readFileSync(pathName, "utf-8");
    const [header, ...listItems] = csvData.split("\n").map(row => row.split(","))
    const items = listItems.map(itemRow => {
        return header.reduce((item: Record<string, any>, headerItem: string, index: number) => {
            item[headerItem] = Number.isNaN(+itemRow[index]) ? itemRow[index] : +itemRow[index];
            return item
        }, {})
    })

    const collection = db.collection(collectionName);
    await collection.dropCollection()
    const newCollection = db.collection(collectionName);
    await newCollection.insertMany(items)
}

export {csvImporter}