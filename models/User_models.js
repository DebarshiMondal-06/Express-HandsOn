const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name has to be there'],
    },
    email: {
        type: String,
        required: [true, 'Email has to be there'],
        unique: true,
        validate: [validator.isEmail, 'Please Provide a Validate Email Id. ']
    },
    password: {
        type: String,
        required: [true, 'Password must have.'],
        maxlength: 10,
        minlength: 6,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password !! '],
        validate: {
            validator: function (val) {
                return val === this.password
            },
            message: `Password didn't matched. Try Again!`
        }

    },
    passwordChangedAt: {
        type: Date,
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ['admin', 'guide', "user"]
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    Active: {
        type: Boolean,
        default: true,
        select: false
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcryptjs.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});

UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcryptjs.compare(candidatePassword, userPassword); // comparing.............
} // Instance Method......................

UserSchema.methods.changePasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const chnagedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        // console.log(chnagedTimestamp, JWTTimestamp);
        return JWTTimestamp < chnagedTimestamp;
    }
    // false means not changed............
    return false;
};

UserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toLocaleString('hex');
    console.log({ resetToken });

    // Encrypted password token for security..................
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    console.log(this.passwordResetToken);

    // Expires token after 10 min..
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

UserSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

// UserSchema.pre(/^find/, function (next) {
//     this.find({ Active: { $ne: false } });
//     next();
// });



const User = mongoose.model('User', UserSchema);
module.exports = User;