var express = require('express'),
app = express();
var employee = require('./src/employee');
var bodyParser = require('body-parser')

app.use(bodyParser.json());

app.get("/api/employee", async function(req, res) {
  const employeeList = await employee.getAllemployee();
  res.json(employeeList)
});

app.post('/api/employee', async (req, res) => {
  const id = await employee.createEmployee(req.body.employee);
  res.json({ id });
});

app.delete('/api/employee/:id', async (req, res) => {
  await employee.deleteEmployee(req.params.id);
  res.json({ id: req.params.id });
});

app.put('/api/employee/:id', async (req, res) => {
  await employee.updateEmployee(req.params.id, req.body.employee);
  res.json({ id: req.params.id });
});

app.listen(6001, () => console.log("Server started on port 6001"));
