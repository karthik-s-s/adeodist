const mySqlPool = require('../config/mysqlConfig');
const sql = require('../config/sqlConstraints');
const { createSession } = require('../config/auth');
const crypto = require('crypto');
var path = require('path');
const fs = require('fs-extra');

module.exports.login = async (req, res, auth) => {
  console.log('Entering login req.body:', req.body);
  let input = req.body;
  input.password = crypto
    .createHash('sha256')
    .update(input.password)
    .digest('hex');
  try {
    var authBind = [input.email, input.password];
    // console.log('auth bind paramas', authBind);
    [rowsAuthQuery] = await mySqlPool.query(sql.sqlQuery.getUser, authBind);
    if (rowsAuthQuery.length == 0) {
      console.log('Exiting from login due to invalid email or password');
      return res
        .json({ status: false, msg: 'Invalid user or password' })
        .status(401);
    }

    let token = createSession(rowsAuthQuery[0]);
    console.log('Exiting from login successfully');
    res.json({ status: true, token: token });
  } catch (e) {
    console.log('error', e);
    res.json({ status: false, msg: 'login failed' });
  }
};

module.exports.allUsers = async (req, res, auth) => {
  console.log('Entering allUsers');
  try {
    let [allUsers] = await mySqlPool.query(sql.sqlQuery.allUsers);
    console.log('Exiting from allUsers successfully');
    res.json({ status: true, data: allUsers });
  } catch (e) {
    console.log('error', e);
    res.json({ status: false, msg: 'Oops data could not be accessed' });
  }
};

module.exports.createUser = async (req, res, auth) => {
  console.log('Entering createUser');
  let input = req.body;
  try {
    input.password = crypto
      .createHash('sha256')
      .update(input.password)
      .digest('hex');
    if (req.user.role == 'admin' && input.role == 'admin') {
      return res
        .status(403)
        .json({
          status: false,
          msg: "You don't have permission to perform this operation",
        });
    }

    let queryData = [input.name, input.role, input.email, input.password];
    await mySqlPool.query(sql.sqlQuery.createUser, queryData);
    console.log('Exiting from createUser successfully');
    res.json({ status: true, msg: 'Success' });
  } catch (e) {
    console.log('error', e);
    res.json({ status: false, msg: 'failed' });
  }
};

module.exports.updateUser = async (req, res, auth) => {
  console.log('Entering updateUser with:', req.body);
  let input = req.body;
  try {
    let queryData = [input.role, input.isActive, input.userId];
    await mySqlPool.query(sql.sqlQuery.updateRoleandAccess, queryData);
    console.log('Exiting from updateUser successfully');
    res.json({ status: true, msg: 'Updated' });
  } catch (e) {
    console.log('error', e);
    res.json({ status: false, msg: 'failed' });
  }
};

module.exports.getAllFeeds = async (req, res, auth) => {
  console.log('Entering getAllFeeds');
  try {
    let [allFeeds] = await mySqlPool.query(sql.sqlQuery.getAllFeeds);
    console.log('Exiting from getAllFeeds successfully');
    res.json({ status: true, data: allFeeds });
  } catch (e) {
    console.log('error', e);
    res.json({ status: false, msg: 'Oops data could not be accessed' });
  }
};

module.exports.updateFeed = async (req, res) => {
  console.log('Entering updateFeed with:', req.body);
  let input = req.body;
  try {
    let queryData = [input.name, input.url, input.description, input.feedId];
    await mySqlPool.query(sql.sqlQuery.updateFeed, queryData);
    console.log('Exiting from updateFeed successfully');
    res.json({ status: true, msg: 'Updated' });
  } catch (e) {
    console.log('error', e);
    res.json({ status: false, msg: 'failed' });
  }
};

module.exports.addUserFeedMapping = async (req, res) => {
  console.log('Entering addUserFeedMapping with:', req.body);
  let input = req.body;
  try {
    let queryData = [input.feedId, input.userId];
    await mySqlPool.query(sql.sqlQuery.addUserFeedMapping, queryData);
    console.log('Exiting from addUserFeedMapping successfully');
    res.json({ status: true, msg: 'Added' });
  } catch (e) {
    console.log('error', e);
    res.json({ status: false, msg: 'failed' });
  }
};

module.exports.logs = async (req, res, auth) => {
  console.log('Entering logs');
  let input = req.body;
  try {
    const logDirectory = path.join(__dirname, '..', 'logs');

    const currentTime = Date.now();
    const fiveMinutesAgo = currentTime - 5 * 60 * 1000; // 5 minutes in milliseconds
    const recentLogs = fs.readdirSync(logDirectory)
      .filter((file) => {
        const filePath = `${logDirectory}/${file}`;
        const fileStat = fs.statSync(filePath);
        const fileCreationTime = fileStat.ctime.getTime();
        return fileCreationTime >= fiveMinutesAgo;
      })
      .map((file) => {
        const filePath = `${logDirectory}/${file}`;
        return fs.readFileSync(filePath, 'utf8');
      });
  
    res.send(recentLogs.join('\n'));
    
  } catch (e) {
    console.log('error', e);
    res.json({ status: false, msg: 'failed' });
  }
};


