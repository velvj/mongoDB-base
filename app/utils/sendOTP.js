const sendOTP = (mobileNumber) => {
  try {
    if (mobileNumber) {
      let otp = Math.floor(1000 + Math.random() * 9000);
      otp =1234
      return otp
    }
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};


module.exports = {
  sendOTP,
};
