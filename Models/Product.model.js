const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  code: {

  },
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
  },
  materials: [
    {
      material_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RowMaterial',
        required: [true, 'Material ID is required'],
      },
      quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: 0,
      },
    },
  ],
}, {
  timestamps: true,
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;