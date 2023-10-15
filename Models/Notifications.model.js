//Modelo de notificaciones con remitente, destinatario, mensaje y fecha de creación
const mongoose = require('mongoose');

RECIVER = ["Administrador", "Ventas", "Producción", "Logistica", "Compras"];

const notificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Sender is required']
    },    
    receiver: {
        type: String,
        enum: RECIVER,
        required: [true, 'Receiver is required']
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    },
    status: {
        type: String,
        enum: ["Leído", "No leído"],
        default: "No leído"
    }
}, {
    timestamps: true,
    collection: 'Notification',
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

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
