const uuidv1 = require("uuid/v1");
const DB = require("./db");

async function getAllemployee() {
  return await DB.get("SELECT * FROM employee");
}

async function createEmployee({ name, department, month, phone, address , dob, doj }) {
  const id = uuidv1();
  const query = {
    text: "INSERT INTO employee(name, department, id, dob, doj, phone, address) VALUES($1, $2, $3, $4, $5, $6, $7)",
    values:  [name, department, id, dob, doj, phone, address],
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

async function updateEmployee(id, { name, department, month, phone, address , dob, doj}) {
  const query = {
    text: "UPDATE employee SET name = $1, department = $2 , month =$3, phone=$4, address=&5, dob=$6, doj=$7  WHERE id = $8",
    values: [name, department, month, phone, address , dob, doj, id],
  };
  return await DB.mutate(query);
}

module.exports = {
  getAllemployee,
  createEmployee,
  deleteEmployee,
  updateEmployee
};
