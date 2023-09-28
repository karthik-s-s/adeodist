var express = require('express');
var router = express.Router();
const userServices = require('../services/userServices');
const { authRole, role, verifyToken } = require('../config/auth');

router.get(
  '/feeds',
  verifyToken,
  authRole([role.USER]), 
  (req, res) => {
  userServices.feeds(req, res);
});

module.exports = router;
