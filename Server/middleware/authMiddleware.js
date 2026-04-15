const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;
    if(!token){
        return res.status(401).json({msg: "Access Denied: No token provided"});
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: verified.id,
            role: verified.role
        };
        next();
    } catch(error) {
        res.status(401).json({msg: "Invalid Token"});
    }
};
module.exports = auth;