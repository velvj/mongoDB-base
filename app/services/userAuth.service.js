const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { sendOTP } = require("../utils/sendOTP.js");
const  Users  = require("../models/users.js");

const findUserService = async (params,isSendOTP =false) => {
    params.isDeleted  =  false
    const UserData = await Users.findOne(params);
    if (UserData) {
        if(isSendOTP)
        {
            console.log(UserData)
            const user = UserData;
            const otp = await sendOTP(user.mobileNumber);
            console.log(otp);
            user.otp = otp;
            await user.save();
        }
        return {
          status: true,
          data: UserData,
          message: messages.success,
          statusCode: statusCodes.HTTP_OK,
        };
      } else {
        return {
          status: false,
          statusCode: statusCodes.HTTP_BAD_REQUEST,
          message: messages.invalidCredentials,
          data: [],
        };
      }
};


module.exports = {
    findUserService
};
