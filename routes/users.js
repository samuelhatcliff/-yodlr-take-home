var express = require('express');
var router = express.Router();
var _ = require('lodash');
var logger = require('../lib/logger');
var log = logger();

var users = require('../init_data.json').data;
var curId = _.size(users);


const registerSchema = require("../schemas/register.json");
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressError");


/* GET users listing. */
router.get('/', function (req, res) {
  res.json(_.toArray(users));
});

/* Create a new user */
router.post('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  log.info('sdfsafdasdfsa')

  console.log("HIT ROUTE")
  var user = req.body;
  console.log("REQ BODY", req.body, req)
  try {
    const validator = jsonschema.validate(user, registerSchema);
    if (!validator.valid) {
      console.log('invalid'
      )
      // const errs = validator.errors.map(e => e.stack);
      // throw new BadRequestError(errs);
    }
    if (validator.valid) {
      console.log('validator was valid')
    }
  } catch (err) {
    return next(err);
  }
  log.info('sdfsafdasdfsa')
  user.id = curId++;
  if (!user.state) {
    user.state = 'pending';
  }
  users[user.id] = user;
  log.info('Created userrrr', user);
  res.json(user);
});

/* Get a specific user by id */
router.get('/:id', function (req, res, next) {
  var user = users[req.params.id];
  if (!user) {
    return next();
  }
  res.json(users[req.params.id]);
});

/* Delete a user by id */
router.delete('/:id', function (req, res) {
  var user = users[req.params.id];
  delete users[req.params.id];
  res.status(204);
  log.info('Deleted user', user);
  res.json(user);
});

/* Update a user by id */
router.put('/:id', function (req, res, next) {
  var user = req.body;
  if (user.id != req.params.id) {
    return next(new Error('ID paramter does not match body'));
  }
  users[user.id] = user;
  log.info('Updating user', user);
  res.json(user);
});


module.exports = router;
