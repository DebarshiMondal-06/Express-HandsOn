const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

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
		required: [true, 'Please confirm your password! '],
		validate: {
			validator: function (val) {
				return val === this.password
			},
			message: `Password didn't matched. Try Again!`
		}

	},
	passwordChangedAt: Date,
	photo: String,

});

UserSchema.pre('save', async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	this.password = await bcryptjs.hash(this.password, 12);
	this.confirmPassword = undefined;
	next();
});
UserSchema.pre('find', async function (next) {
	this.confirmPassword = undefined;
	next();
});


UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
	return await bcryptjs.compare(candidatePassword, userPassword); // comparing.............
} // Instance Method......................

UserSchema.methods.changePasswordAdter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		console.log(this.passwordChangedAt, JWTTimestamp);
	}
	return false;
}


const User = mongoose.model('User', UserSchema);
module.exports = User;