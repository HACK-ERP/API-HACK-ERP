//RowMaterials controller

const RowMaterial = require('../Models/RowMaterial.model');
const { StatusCodes } = require('http-status-codes');
const createHttpError = require('http-errors');

module.exports.create = (req, res, next) => {
    if (req.file) {
        req.body.image = req.file.path;
      }
    
    const rowMaterial = new RowMaterial(req.body);
    rowMaterial.save()
        .then((rowMaterial) => {
            if(!rowMaterial) {
                next(createHttpError(StatusCodes.BAD_REQUEST, 'RowMaterial not created'))
            } else {
                res.status(StatusCodes.CREATED).json(rowMaterial)
            }
        })
        .catch(next);
}

module.exports.list = (req, res, next) => {
    RowMaterial.find()
        /* haciendo populate de los supliers según el código
            suppliers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    }] */
        .populate('suppliers')
        .then((rowMaterials) => {
            if(!rowMaterials) {
                next(createHttpError(StatusCodes.NOT_FOUND, 'RowMaterials not found'))
            } else {
                res.status(StatusCodes.OK).json(rowMaterials)
            }
        })
        .catch(next);
}

module.exports.getOne = (req, res, next) => {
    console.log("entra en getOne")
    RowMaterial.findById(req.params.id)
        .then((rowMaterial) => {
            if(!rowMaterial) {
                next(createHttpError(StatusCodes.NOT_FOUND, 'RowMaterial not found'))
            } else {
                res.status(StatusCodes.OK).json(rowMaterial)
            }
        })
        .catch(next);
}

//update

module.exports.update = (req, res, next) => {
    if (req.file) {
        req.body.image = req.file.path;
      }
      
    RowMaterial.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((rowMaterial) => {
            if(!rowMaterial) {
                next(createHttpError(StatusCodes.NOT_FOUND, 'RowMaterial not found'))
            } else {
                res.status(StatusCodes.OK).json(rowMaterial)
            }
        })
        .catch(next);
}

//stok update

module.exports.PurchaseMaterials = (req, res, next) => {
    const { id } = req.params;

    RowMaterial.findByIdAndUpdate(id, { $inc: { stock: req.body.stock, price:req.body.price} }, { new: true })
        .then((rowMaterial) => {
            if(!rowMaterial) {
                //mail
                next(createHttpError(StatusCodes.NOT_FOUND, 'RowMaterial not found'))
            } else {
                res.status(StatusCodes.OK).json(rowMaterial)
            }
        })
        .catch(next);
}

module.exports.discountStock = (req, res, next) => {
    const { id } = req.params;

    RowMaterial.findByIdAndUpdate(id, { $inc: { stock: req.body.stock } }, { new: true })
        .then((rowMaterial) => {
            if(!rowMaterial) {
                next(createHttpError(StatusCodes.NOT_FOUND, 'RowMaterial not found'))
            } else {
                res.status(StatusCodes.OK).json(rowMaterial)
            }
        })
        .catch(next);
}

