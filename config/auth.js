require('dotenv').config();
const jwt = require('jsonwebtoken');

let role = {
  ADMIN: 'admin',
  SUPERADMIN: 'superAdmin',
  USER: 'user',
};

function verifyToken(req, res, next) {
  // Retrieve the token from the request headers, cookies, or wherever it's sent
  const token = req.headers.token || '';

  if (!token) {
    return res.status(401).json({ status: false, msg: 'Unauthorized' });
  }
  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.SECRET);
    // Store the decoded data in the request object for use in route handlers
    req.user = decoded;
    console.log(req.user);

    next(); // Continue processing the request
  } catch (error) {
    return res.status(401).json({ status: false, msg: 'Unauthorized' });
  }
}

function authRole(allowedRoles) {
  console.log(allowedRoles);
  return (req, res, next) => {
    // Check if the user's role is in the allowedRoles array
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({ status: false, msg: 'Permission denied' });
    }
    next();
  };
}

//jwt
function createSession(data) {
  var theToken = jwt.sign(data, process.env.SECRET, {
    expiresIn: 24 * 60 * 60 * 30,
  });
  return theToken;
}

module.exports = {
  authRole,
  role,
  createSession,
  verifyToken,
};
