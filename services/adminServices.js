const mySqlPool = require('../config/mysqlConfig');
const sql = require('../config/sqlConstraints');
const { authUser, createSession } = require('../config/auth');

module.exports.createFeed = async (req, res, auth) => {
  console.log('Entering createFeed with:', req.body);
  let input = req.body;
  try {
    let queryData = [input.name, input.url, input.description, input.userId];
    await mySqlPool.query(sql.sqlQuery.createFeed, queryData);
    console.log('Exiting from createFeed successfully');
    res.json({ status: true, msg: 'Success' });
  } catch (e) {
    console.log('error', e);
    res.json({ status: false, msg: 'failed' });
  }
};

module.exports.deleteFeed = async (req, res) => {
  console.log('Entering deleteFeed with:', req.query);
  const feedId = parseInt(req.query.id);
  try {
    // return false if there is not feeedId
    if (typeof feedId === 'undefined')
      return res.json({ status: false, msg: 'feed Id not found' });

    if (req.user.role == 'admin') {
      let [userFeedMapping] = await mySqlPool.query(
        sql.sqlQuery.getUserFeedMappingById,
        [req.user.id, feedId]
      );
      console.log(userFeedMapping.length);
      if (userFeedMapping.length < 0) {
        return res.status(401).json({
          status: true,
          msg: "You don't have permission to perform this action",
        });
      }

      //admin can only delete the feed which they have access to
    }
    //await mySqlPool.query(sql.sqlQuery.dropFeed,[feedId,feedId]);
    console.log('Exiting from deleteFeed successfully');
    res.json({ status: true, msg: 'Deleted' });
  } catch (e) {
    console.log('error', e);
    res.json({ status: false, msg: 'failed' });
  }
};
