var express = require('express');
var router = express.Router();
const superAdminServices = require('../services/superAdminServices');
const { authRole, role, verifyToken } = require('../config/auth');

router.post('/login', (req, res) => {
  //common api for role based login
  superAdminServices.login(req, res);
});

router.get(
  '/getAllFeeds',
  verifyToken,
  authRole([role.SUPERADMIN]),
  (req, res) => {
    //for fetching all the feeds stored in DB
    superAdminServices.getAllFeeds(req, res);
  }
);

router.put(
  '/feed',
  verifyToken,
  authRole([role.SUPERADMIN]), (req, res) => {
  //for updating feed
  superAdminServices.updateFeed(req, res);
});

router.post(
  '/createuser',
  verifyToken,
  authRole([role.SUPERADMIN, role.ADMIN]),
  (req, res) => {
    //for creating user
    // this route have permission to both superAdmin and admin
    // admin can only create user, but super admin can create both admin and user's
    superAdminServices.createUser(req, res);
  }
);

router.get(
  '/allUsers',
  verifyToken,
  authRole([role.SUPERADMIN]),
  (req, res) => {
    // for getting all users from db
    superAdminServices.allUsers(req, res);
  }
);

router.put(
  '/updateUser',
  verifyToken,
  authRole([role.SUPERADMIN]),
  (req, res) => {
    //for updating user role and access
    superAdminServices.updateUser(req, res);
  }
);

router.put(
  '/addUserFeedMapping',
  verifyToken,
  authRole([role.SUPERADMIN]),
  (req, res) => {
    //for giving delete access to admin and read access to user
    superAdminServices.addUserFeedMapping(req, res);
  }
);

router.get(
  '/logs',
  verifyToken,
  authRole([role.SUPERADMIN]),
  (req, res) => {
    // for getting all users from db
    superAdminServices.logs(req, res);
  }
);

module.exports = router;
