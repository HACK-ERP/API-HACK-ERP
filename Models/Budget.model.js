const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    budgetNumber: {
        type: String,
        required: [true, 'Budget Number is required'],
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
                min: 1,
            },
        },
    ],
    status: {
        type: String,
        enum: ['Enviado', 'Aceptado', 'Rechazado'],
        default: 'Enviado'
    },
    deliveryDate: {
        type: Date,
        required: [true, 'Delivery Date is required'],
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

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
