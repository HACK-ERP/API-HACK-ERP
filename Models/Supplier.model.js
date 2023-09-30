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
    logo: {
        type: String,
        required: [true, 'Logo is required'],
        default: 'https://res.cloudinary.com/dn6cd98sl/image/upload/v1614816220/avatars/default-avatar.png',
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

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;