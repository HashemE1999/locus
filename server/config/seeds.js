const connection = require("./connection");
const { User, Attraction } = require("../models");
const { userData, attractionData } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("Connected!");
  // Delete the collections if they exist
  let attractionCheck = await connection.db
    .listCollections({ name: "attractions" })
    .toArray();
  if (attractionCheck.length) {
    await connection.dropCollection("attractions");
  }

  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  await insertDocs(userData);

  console.table(userData);

  console.info("Seeding complete! 🌱");
  process.exit(0);
});

async function insertDocs(docs) {
  for (const doc of docs) {
    const instance = new User(doc);
    await instance.save();
  }
}
