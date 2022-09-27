const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    address: {
        type: String,
        required: true
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
        type: String,
        required: true
    },
    nearestShowroom: {
        type: String
    },
    referralEmpCode: {
        type: String,
        required: true
    },
    isAcceptedTerms: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const kyc = mongoose.model("kyc", userSchema)
module.exports = kyc