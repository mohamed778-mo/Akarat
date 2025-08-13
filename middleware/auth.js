const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
require('dotenv').config()



const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.access_token || (
      req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null
    );



    if (!token) {
      console.log("No token found");
      return res.status(401).send("Please login!");
    }

    const SECRETKEY ="rdtcyiu8oktvdsj7euw22111gagdhrfhjfajyil82u55hghasdf"
   
    const decoded = jwt.verify(token, SECRETKEY);

    const admin = await Admin.findById(decoded.id);

    if (!admin || !admin.tokens.includes(token) || !admin.isAdmin) {
      return res.status(403).send("Available for ADMIN only");
    }
  
    req.user = admin;
    next();
  } catch (e) {
    res.status(500).send("Admin authentication failed: " + e.message);
  }
};


module.exports = {
  adminAuth,
};
