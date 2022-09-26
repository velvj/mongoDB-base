const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    otp: {
        type: String
    },
    isOtpSent: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

userSchema.pre('save', async function () {
    return new Promise(async (resolve, reject) => {
        const mobileNumberExists = await user.findOne({ mobileNumber: this.get('mobileNumber') })
            .then(doc => { return doc ? true : false })
            .catch(err => reject(err));
        const emailExists = await user.findOne({ email: this.get('email') })
            .then(doc => { return doc ? true : false })
            .catch(err => reject(err));
        if (mobileNumberExists || emailExists) {
            const err = mobileNumberExists ? emailExists ? "Mobile number && Email" : "Mobile number" : emailExists ? "Email" : "";
            reject(new Error(err + ' already exist'))
        } else {
            resolve();
        }
    })
});


const user = mongoose.model("user", userSchema);
module.exports = user;