const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        trim: true,
        min: [0, 'Price must be greater than 0']
    },
    image: {
        type: String,
        default: 'https://res.cloudinary.com/dn6cd98sl/image/upload/v1614816220/avatars/default-avatar.png'
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;