const tokenManagement = require("../Utilis/tokenmanagement");

const auth = async (req, res, next) => {

  const token = req.get("Authorization");
  const verifiedToken = tokenManagement.verifyTokn(token);
  
  if (!verifiedToken) {
    return res.status(401).send("User is not authenticated");
  }

  next();
};

module.exports = auth;
