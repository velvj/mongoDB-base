const jwt = require('jsonwebtoken');

const dotenv = require("dotenv");
const path = require("path");
const { getUserService } = require('../services/userAuth.service');
dotenv.config({ path: path.join(process.cwd(), `${process.argv[2]}`) });
let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
let jwtSecretKey = process.env.JWT_SECRET_KEY;

const generateToken = data => {
    const token = jwt.sign({
        time: Date(),
        ...data
    }, jwtSecretKey);
    return token;
}

const verifyToken = req => {
    try {
        const token = req.header(tokenHeaderKey);

        const verifiedData = jwt.verify(token, jwtSecretKey);

        return verifiedData ? verifiedData : false;

    } catch (error) {
        return false;
    }
}

const authMiddleware = async (req, res, next) => {
    const data = verifyToken(req);
    let user;
    if (data) user = await getUserService({ _id: data.id });
    if (!data || !user.status) return res.status(401).send("Unauthorized");

    req.user = data;
    next();
}

module.exports = {
    generateToken,
    verifyToken,
    authMiddleware
};