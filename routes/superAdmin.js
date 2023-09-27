var express = require('express');
var router = express.Router();
const superAdminServices = require('../services/superAdminServices');

router.post('/login', function (req, res) {
  superAdminServices.login(req, res);
});

module.exports = router;
