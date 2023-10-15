const mongoose = require('mongoose');

const otStatus = ['Pendiente', 'En Proceso', 'Entregado'];

const oTSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Code is required'],
        unique: true,
        trim: true
    },
    budget: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Budget',
        required: [true, 'Budget ID is required'],
    },
    status: {
        type: String,
        enum: otStatus,
        default: 'Pendiente'
    }
}, { timestamps: true,
    collection: 'OT',
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