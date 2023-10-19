const mongoose = require('mongoose');

const otStatus = ['Pendiente', 'Materiales Solicitados', 'Materiales Recibidos', 'En Proceso', 'Entregado'];

const oTSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Code is required'],
        unique: true,
        trim: true,
    },
    budget: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Budget',
        required: [true, 'Budget ID is required'],
    },
    status: {
        type: String,
        enum: otStatus,
        default: 'Pendiente',
    },
}, {
    timestamps: true,
    collection: 'OT',
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = doc.id;
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
});

oTSchema.virtual('requiredMaterials', {
    ref: 'MaterialRequired',
    localField: '_id',
    foreignField: 'otId',
    justOne: false,
}).get(async function () {
    const budget = await mongoose.model('Budget').findOne({ _id: this.budget });
    const requiredMaterials = [];
    let totalCost = 0; // Inicializamos el costo total en 0
    
    for (const product of budget.products) {
        const productInfo = await mongoose.model('Product').findOne({ _id: product.product_id });
        for (const material of productInfo.materials) {
            const materialInfo = await mongoose.model('RowMaterial').findOne({ _id: material.material_id });
            const requiredQuantity = material.quantity * product.quantity;
            
            // Calculamos el costo del material requerido y lo agregamos al costo total
            const materialCost = materialInfo.price * requiredQuantity;
            totalCost += materialCost;

            requiredMaterials.push({
                otNumber: this.code,
                totalCost: totalCost, // Aquí tendrás el costo total actualizado
                materials: {
                    material_id: materialInfo._id, 
                    quantity: requiredQuantity,
                    price: materialInfo.price,
                    name: materialInfo.name,
                    stock: materialInfo.stock,
                },
                otId: this._id,
            });
        }
    }
    return requiredMaterials;
});


const OT = mongoose.model('OT', oTSchema);

module.exports = OT;
