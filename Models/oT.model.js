const mongoose = require('mongoose');

const oTSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Code is required'],
        unique: true,
        trim: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: [true, 'Client ID is required'],
    },
    products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: [true, 'Product ID is required'],
            },
            quantity: {
                type: Number,
                required: [true, 'Quantity is required'],
                min: 0,
            },
        },
    ],  
    status: {
        type: String,
        enum: ['PENDING', 'PRODUCTION', 'DONE'],
        default: 'PENDING'
    },
    deliveryDate: {
        type: Date,
        required: [true, 'Delivery Date is required'],
    },
    deliveryAddress: {
        type: String,
        required: [true, 'Delivery Address is required'],
        trim: true
    },
    comments: {
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

const OT = mongoose.model('OT', oTSchema);

module.exports = OT;

