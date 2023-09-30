const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    surname: {
        type: String,
        required: [true, 'Surname is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    phone: {
        type: Number,
        required: [true, 'Phone is required'],
        trim: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'SALES', 'PRODUCTION', 'WAREHOUSE', 'PURCHASING'],
        default: 'USER'
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dn6cd98sl/image/upload/v1614816220/avatars/default-avatar.png'
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = doc.id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    }
});

userSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(SALT_WORK_FACTOR)
            .then(salt => {
                return bcrypt.hash(user.password, salt)
                    .then(hash => {
                        user.password = hash;
                        next();
                    });
            })
            .catch(error => next(error));
    } else {
        next();
    }
}
);

userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
