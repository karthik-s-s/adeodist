var express = require('express');
var router = express.Router();
const superAdminServices = require('../services/userServices');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
