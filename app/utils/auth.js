const jwt = require('jsonwebtoken');

const dotenv = require("dotenv");
const path = require("path");
const { getUserService } = require('../services/userAuth.service');
dotenv.config({ path: path.join(process.cwd(), `${process.argv[2]}`) });
let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
let jwtSecretKey = process.env.JWT_SECRET_KEY;

const generateToken = data => {
    const token = jwt.sign(
        {
            time: Date(),
            ...data
        },
        jwtSecretKey,
        {
            expiresIn: "1d",
        });
    return token;
}

const verifyToken = token => {
    try {

        const verifiedData = jwt.verify(token, jwtSecretKey);

        return verifiedData ? verifiedData : false;

    } catch (error) {
        console.log(error)
        return false;
    }
}

const authMiddleware = async (req, res, next) => {
    const token = req.header(tokenHeaderKey);
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    const data = verifyToken(token);
    let user;
    console.log('id', data, token)
    if (data) user = await getUserService(data.id);
    if (!data || !user.status) return res.status(401).send("Invalid or expired token");

    req.user = data;
    return next();
}

module.exports = {
    generateToken,
    verifyToken,
    authMiddleware
};