const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    address: {
        type: String
    },
    pinCode: {
        type: String,
        required: true
    },
    panNo: {
        type: String,
        required: true
    },
    nomineeDetails: {
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
        }
    },
    nearestShowroom: {
        type: String
    },
    referralEmpCode: {
        type: String
    },
    isAcceptedTerms: {
        type: Boolean
    }
}, { timestamps: true });


const kyc = mongoose.model("kyc", userSchema)
module.exports = kyc