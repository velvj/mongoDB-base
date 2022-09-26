const { getUserService } = require("../services/userAuth.service");
const { verifyToken } = require("../utils/auth");
const { tokenHeaderKey } = require("../config");


const authMiddleware = async (req, res, next) => {
    const token = req.header(tokenHeaderKey);
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    const data = verifyToken(token);
    let user;
    if (data) user = await getUserService(data.id);
    if (!data || !user.status) return res.status(401).send("Invalid or expired token");

    req.user = data;
    return next();
}


module.exports = { authMiddleware };