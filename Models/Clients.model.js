//Clients model with NIF, RS, Address, Phone, Email, ContactPerson, Comments, logo

const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    NIF: {
        type: String,
        required: [true, 'NIF is required'],
        unique: true,
        trim: true
    },
    RS: {
        type: String,
        required: [true, 'RS is required'],
        trim: true
    },
    Address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
    Phone: {
        type: String,
        required: [true, 'Phone is required'],
        trim: true
    },
    Email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true
    },
    ContactPerson: {
        type: String,
        required: [true, 'Contact Person is required'],
        trim: true
    },
    Comments: {
        type: String,
        trim: true
    },
    logo: {
        type: String,
        trim: true
    },
}, { timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = doc.id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
