const uuidv1 = require("uuid/v1");
const DB = require("./db");

async function getAllemployee() {
  return await DB.get("SELECT * FROM employee");
}

async function createEmployee({ name, department, month}) {
  const id = uuidv1();  
  const query = {
    text: "INSERT INTO employee VALUES($1, $2, $3, $4 )",
    values:  [name, department, id, month],
  };
  await DB.mutate(query);
  return id;
}

async function deleteEmployee(id) {
  const query = {
    text: "DELETE FROM employee WHERE id = $1",
    values: [ id ],
  };
  return await DB.mutate(query);
}

async function updateEmployee(id, { name, department, month}) {
  const query = {
    text: "UPDATE employee SET name = $1, department = $2 , month =$3 WHERE id = $4",
    values: [name, department, month, id],
  };
  return await DB.mutate(query);
}

module.exports = {
  getAllemployee,
  createEmployee,
  deleteEmployee,
  updateEmployee
};
