const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config');


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
        return false;
    }
}

module.exports = {
    generateToken,
    verifyToken,
};