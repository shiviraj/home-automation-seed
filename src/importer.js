const fs = require("fs");
const path = require("path");

const csvImporter = async (db, fileName, collectionName) => {
    const pathName = path.join(__dirname, `./resource/${fileName}`);
    const csvData = fs.readFileSync(pathName, "utf-8");
    const [header, ...listItems] = csvData.split("\n").map(row => row.split(","))
    const items = listItems.map(itemRow => {
        return header.reduce((item, headerItem, index) => {
             item[headerItem] = Number.isNaN(+itemRow[index]) ? itemRow[index] : +itemRow[index];
             return item
        }, {})
    })
    await db.collection(collectionName).insertMany(items, {ordered: true})
}

module.exports = {csvImporter}