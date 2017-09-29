const uuidv1 = require("uuid/v1");
const DB = require("./db");

async function getAllemployee() {
  const employee = await DB.get("SELECT * FROM employee");
  return employee;
}

async function createEmployee({ name, department, id}) {
  const idnew = uuidv1();  
  const query = {
    text: "INSERT INTO employee VALUES($1, $2, $3 )",
    values:  [name, department, idnew],
  };
  return await DB.mutate(query);
}

async function deleteEmployee(id) {
  const query = {
    text: "DELETE FROM employee WHERE id = $1",
    values: [ id ],
  };
  return await DB.mutate(query);
}

async function updateEmployee(id, { name, department}) {
  const query = {
    text: "UPDATE employee SET name = $1, department = $2 WHERE id = $3",
    values: [name, department, id],
  };
  return await DB.mutate(query);
}

module.exports = {
  getAllemployee,
  createEmployee,
  deleteEmployee,
  updateEmployee
};
