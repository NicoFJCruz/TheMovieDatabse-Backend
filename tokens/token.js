const jwt = require("jsonwebtoken");
const SECRET = "NicoTMDB";

function generateToken(payload) {
  const token = jwt.sign({ payload }, SECRET, {
    expiresIn: "24h", 
  });

  return token;
}

function validateToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, validateToken };