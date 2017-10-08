const uuidv1 = require("uuid/v1");
const DB = require("./db");

async function getUser(username, password) {
  const query = {
    text: "SELECT * FROM user_table where username = $1 and password = $2",
    values:  [username, password],
  };
  return await DB.get(query);
}

async function findById(id) {
  const query = {
    text: "SELECT * FROM user_table where id = $1",
    values:  [id],
  };
  return await DB.get(query);
}

module.exports = {
  getUser,
  findById
};
