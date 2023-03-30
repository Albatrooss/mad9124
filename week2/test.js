const fs = require("fs");
const path = require("path");

const { DB_URL } = process.env;

main();

async function main() {
  await connectToDb(DB_URL);
  const userData = await fetchFromDb();

  const savePath = path.join(__dirname, "../build/studentData.json");

  fs.writeFileSync(savePath, JSON.stringify(userData));

  console.log("Complete!");
  process.exit(0);
}

async function connectToDb(dbString) {
  console.log("Connected!");
}

async function fetchFromDb() {
  return [
    { id: 1, firstName: "Tim", lastName: "Robillard" },
    { id: 2, firstName: "Tim", lastName: "Robillard" },
    { id: 3, firstName: "Tim", lastName: "Robillard" },
    { id: 4, firstName: "Tim", lastName: "Robillard" },
    { id: 5, firstName: "Tim", lastName: "Robillard" },
    { id: 6, firstName: "Tim", lastName: "Robillard" },
    { id: 7, firstName: "Tim", lastName: "Robillard" },
  ];
}
