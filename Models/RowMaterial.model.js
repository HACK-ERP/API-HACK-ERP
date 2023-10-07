const mongoose = require('mongoose');
const rowMaterialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    price: {
        type: Number,
        trim: true
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dn6cd98sl/image/upload/v1614816220/avatars/default-avatar.png'
    },
    stock: {
        type: Number,
        deffault: 0,
        trim: true
    },
    suppliers:[
        {
            supplier_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Supplier',
            },
        },
    ],
},
{ timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = doc.id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
}
);
const RowMaterial = mongoose.model('RowMaterial', rowMaterialSchema);
module.exports = RowMaterial;