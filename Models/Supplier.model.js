//supplier model
const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    cif: {
        type: String,
        required: [true, 'CIF is required'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
    phone: {
        type: Number,
        required: [true, 'Phone is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true
    },
    rowMaterials: [
        {
            rowMaterials: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'RowMaterial',
                required: [true, 'RowMaterial ID is required'],
            },
            price: {
                type: Number,
                required: [true, 'Price is required'],
                trim: true
            },
        },
    ],
}, { timestamps: true });

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;