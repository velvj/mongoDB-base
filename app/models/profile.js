const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    details: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'kyc'
    },
    nominee: {
        type: String
    },
    aadhaarNumber: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })


const profile = mongoose.model("profile", profileSchema);
module.exports = profile;