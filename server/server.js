var express = require('express');
var bodyParser = require('body-parser');
var employee = require('./src/employee');
var app = express();

app.use(bodyParser.json());

// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).send();
// });

app.get("/api/employee", async function(req, res) {
  const employeeList = await employee.getAllemployee();
  res.json(employeeList)
});

app.post('/api/employee', async (req, res) => {
  const id = await employee.createEmployee(req.body.employee);
  if (id) {
    res.json({ id });
  } else {
    res.status(500).send('Error while creating employee !')
  }
});

app.delete('/api/employee/:id', async (req, res) => {
  const rowCount = await employee.deleteEmployee(req.params.id);
  if (rowCount === 1) {
    res.json({ id: req.params.id });
  } else {
    res.status(500).send('Error while deleting employee !')
  }
});

app.put('/api/employee/:id', async (req, res) => {
  const rowCount = await employee.updateEmployee(req.params.id, req.body.employee);
  if (rowCount === 1) {
    res.json({ id: req.params.id });
  } else {
    res.status(500).send('Error while updating employee !')
  }
});

app.listen(6001, () => console.log("Server started on port 6001"));
