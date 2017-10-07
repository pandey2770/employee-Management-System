var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var Employee = require('./src/employee');
var app = express();

require('./src/auth.js');

app.use(express.static('public'));
app.use(session({ secret: 'ssdn', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.json());

// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).send();
// });

app.post('/api/login',
  passport.authenticate('local'),
  function(req, res) {
    res.status(200).send();
  }
);

app.get('/api/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get("/api/employee", async (req, res) => {
  if (req.isAuthenticated()) {
    const employeeList = await Employee.getAllemployee();
    res.json(employeeList)
  } else {
    res.status(401).send();
  }
});

app.post('/api/employee', async (req, res) => {
  const id = await Employee.createEmployee(req.body.employee);
  if (id) {
    res.json({ id });
  } else {
    res.status(500).send('Error while creating employee !')
  }
});

app.delete('/api/employee/:id', async (req, res) => {
  const rowCount = await Employee.deleteEmployee(req.params.id);
  if (rowCount === 1) {
    res.json({ id: req.params.id });
  } else {
    res.status(500).send('Error while deleting employee !')
  }
});

app.put('/api/employee/:id', async (req, res) => {
  console.log('****', req.user, req.isAuthenticated())
  const rowCount = await Employee.updateEmployee(req.params.id, req.body.employee);
  if (rowCount === 1) {
    res.json({ id: req.params.id });
  } else {
    res.status(500).send('Error while updating employee !')
  }
});

app.listen(6001, () => console.log("Server started on port 6001"));


/**
 * 1. auth middleware
 * √ 2. logout
 * 3. seure all api
 * 4. api to get user details
 * 5. show username on frontend
 * 6. redirect user to login page on FE if not loggedin
 * 7. Move employee get query
 */