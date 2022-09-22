const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
    },
    status: {
        type: String,
        enum: ["enabled", "disabled", "blocked"],
        default: "enabled"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
    }
}, { timestamps: true });


 userSchema.methods.toJSON = function() {
     const user = this;
     const userObject = user.toObject();
     delete userObject.otp;
     delete userObject.token;
     return userObject;
};
const User = mongoose.model("users", userSchema);
module.exports = User;


// token: String,
//     facebookToken: String,
//     googleToken: String,
//     completedLevels: {
//         type: Array,
//         required: false,
//         default: []
//     },



// userSchema.methods.generateAuthToken = async function() {
//     const user = this;
//     const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
//     user.token = token;
//     user.isActive = true
//     await user.save();
//     return token;
// };
// userSchema.statics.findByCredentials = async(
//     mobileNumber,
//     otp = undefined,
//     isResendOtp = false
// ) => {
//     const user = await User.findOne({ mobileNumber });

//     if (otp) {
//         let otp_time = new Date(user.updatedAt)
//         let current_date_time = new Date()
//         let timeDifference = Math.abs(current_date_time.getTime() - otp_time.getTime());
//         timeDifference = Math.round(timeDifference / (1000));
//         console.log('timeDifference : ' + timeDifference)
//         if (timeDifference >= OTP_EXPIRED_TIME_MIN * 60) {
//             throw expiredOtp;
//         }
//         const isMatch = otp == user.otp ? true : false;
//         if (!isMatch) {
//             throw invalidOtp;
//         }

//         return user;
//     } else {
//         if (!user) {
//             throw invalidMobileNumber;
//         }
//         if (!user.isActive && !isResendOtp) {
//             throw inActiveUser
//         }
//         return user;
//     }
// };