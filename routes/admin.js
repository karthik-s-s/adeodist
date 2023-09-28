var express = require('express');
var router = express.Router();
const adminServices = require('../services/adminServices');
const { authRole, role, verifyToken } = require('../config/auth');

router.post(
  '/feed',
  verifyToken,
  authRole([role.SUPERADMIN, role.ADMIN]),
  (req, res) => {
    adminServices.createFeed(req, res);
  }
);

router.delete(
  '/feed',
  verifyToken,
  authRole([role.SUPERADMIN, role.ADMIN]),
  (req, res) => {
    adminServices.deleteFeed(req, res);
  }
);

module.exports = router;
