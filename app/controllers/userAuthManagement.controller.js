const {
    sendErrorResponse,
    sendSuccessResponse,
  } = require("../response/response");
  const {
    findUserService,
  } = require("../services/userAuth.service");

  const login = async (req, res) => {    
    const params = req.body;
    const result = await findUserService(params,isSendOTP =true);
    if (!result.status) {
      return sendErrorResponse(
        req,
        res,
        result.statusCode,
        result.message,
        []
      );
    }
    else
    {
        return sendSuccessResponse(
          req,
          res,
          result.statusCode,
          result.message,
          result.data
        );
    }
  };
  module.exports = {
    login
  };
