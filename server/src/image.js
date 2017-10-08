const uuidv1 = require("uuid/v1");
const DB = require("./db");

async function saveImage(file) {
  const id = uuidv1();
  console.log('*******', id, file)
  const query = {
    text: "insert into image_table values($1, $2)",
    values:  [id, file],
  };
  await DB.get(query);
  return id;
}

async function getImage(id) {
  const query = {
    text: "SELECT * FROM image_table where id = $1",
    values:  [id],
  };
  return await DB.get(query);
}

module.exports = {
  saveImage,
  getImage
};
