const mySqlPool = require('../config/mysqlConfig');
const sql = require('../config/sqlConstraints');

module.exports.login = async (req, res) => {
  console.log('Entering login req.body:', req.body);
  let input = req.body;
  try {
    //var queryData = [input.doctorId, input.doctorId];
    let messages = await mySqlPool.query(sql.sqlQuery.test);
    console.log('Exiting from login successfully');
    res.json({ status: true, data: messages });
  } catch (e) {
    //console.log("error", e)
    res.json({ status: false, msg: 'login failed' });
  }
};
