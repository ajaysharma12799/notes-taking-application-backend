const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if(!token) {
            return res.status(401).json({error: "Token is Not Present, Authorization Denied"});
        }
        const decode = jwt.verify(token, process.env.JWTSECRET);
        console.log(decode);
        req.user = decode.user;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({error: "Token is Invalid"});
    }
}