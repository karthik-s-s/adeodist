const mySqlPool = require('../config/mysqlConfig');
const sql = require('../config/sqlConstraints');

module.exports.feeds = async (req, res, auth) => {
  console.log('Entering user/feeds with:');
  let userId = req.query.userId;
  try {
    let [feeds] = await mySqlPool.query(sql.sqlQuery.allowedFeedsByUserId, [
      userId,
    ]);
    console.log('Exiting from updateUser successfully');
    res.json({ status: true, data: feeds });
  } catch (e) {
    console.log('error', e);
    res.json({ status: false, msg: 'failed' });
  }
};
