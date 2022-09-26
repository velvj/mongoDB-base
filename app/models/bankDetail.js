const mongoose = require('mongoose')

const bankDetailSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    accountHolderName: {
        type: String,
        default: true
    },
    bankName: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    ifsc: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const BankDetail = mongoose.model("bankDetail", bankDetailSchema);

module.exports = BankDetail;