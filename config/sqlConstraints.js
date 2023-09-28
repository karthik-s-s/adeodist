module.exports.sqlQuery = {
  test: 'SELECT * FROM user;',
  getUser:'SELECT * FROM user WHERE email = ? AND password = ? AND is_active = 1;',
  getAllFeeds:'SELECT * FROM feed;',
  allUsers:'SELECT * FROM user;',
  createUser:'INSERT INTO `user` (`name`, `role`, `email`, `password`) VALUES (?, ?, ?, ?);',
  updateRoleandAccess:'UPDATE `user` SET `role` = ?, `is_active` = ? WHERE (`id` = ?);',
  createFeed:'INSERT INTO `feed` (`name`, `url`, `description`, `user_id`) VALUES (?, ?, ?, ?);',
  updateFeed:'UPDATE `feed` SET `name` = ?, `url` = ?, `description` = ? WHERE (`id` = ?);',
  addUserFeedMapping:'INSERT INTO `user_feed_mapping` (`feed_id`, `user_id`) VALUES (?, ?);',
  getUserFeedMappingById:
  `SELECT feed.id AS feed_id, feed.name AS feed_name, feed.url AS feed_url, feed.description AS feed_description, user_feed_mapping.user_id
  FROM feed
  INNER JOIN user_feed_mapping ON feed.id = user_feed_mapping.feed_id
  WHERE user_feed_mapping.user_id = ?  AND user_feed_mapping.feed_id = ?;`,
  dropFeed:'DELETE FROM `user_feed_mapping` WHERE (`feed_id` = ?);DELETE FROM `feed` WHERE (`id` = ?);',
  allowedFeedsByUserId:
  `SELECT f.id as feedId, f.name, f.url, f.description
  FROM user_feed_mapping m
  JOIN feed f ON m.feed_id = f.id
  WHERE m.user_id = ?;`
};
