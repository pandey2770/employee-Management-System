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
  await employee.createEmployee(req.body.employee);
  res.json(req.body);
});

app.listen(6001, () => console.log("Server started on port 6001"));
