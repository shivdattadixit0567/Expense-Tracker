const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];
  //   console.log(token);

  const verifyToken = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        return false;
      } else {
        return decoded;
      }
    }
  );
  //   console.log(verifyToken);
  if (verifyToken) {
    req.user = verifyToken.id;
    next();
  } else {
    const err = new Error("Token expired, login again");
    next(err);
  }
};

module.exports = isAuthenticated;
