const DB = require("./db");

async function getAllemployee() {
  const employee = await DB.get("SELECT * FROM employee");
  return employee;
}
async function createEmployee({ name, department }) {
  const query = {
    text: "INSERT INTO employee VALUES($1, $2 )",
    values:  [name, department],
  };
  return await DB.mutate(query);
}

module.exports = {
  getAllemployee,
  createEmployee,
};