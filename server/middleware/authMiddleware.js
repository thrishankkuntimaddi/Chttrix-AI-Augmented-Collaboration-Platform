const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(403).json({ message: "Access denied. No token provided." });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(403).json({ message: "Access denied. Malformed token." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
