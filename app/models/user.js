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
    isDeleted: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    isOtpSent: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

userSchema.pre('save', async function() {
    return new Promise(async(resolve, reject) => {
        const mobileNumberExists = await user.findOne({ mobileNumber: this.get('mobileNumber') })
            .then(doc => { return doc ? true : false })
            .catch(err => reject(err));
        const emailExists = await user.findOne({ email: this.get('email') })
            .then(doc => { return doc ? true : false })
            .catch(err => reject(err));
        if (mobileNumberExists || emailExists) {
            const err = JSON.stringify({ inUse: { email: emailExists, mobileNumber: mobileNumberExists } });
            reject(err)
        } else {
            resolve();
        }
    })
});


const user = mongoose.model("user", userSchema);
module.exports = user;