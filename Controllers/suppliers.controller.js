//supplier controller

const Supplier = require('../Models/Supplier.model');
const RowMaterial = require('../Models/RowMaterial.model');
const { StatusCodes } = require('http-status-codes');
const createHttpError = require('http-errors');

module.exports.create = (req, res, next) => {
    const supplier = new Supplier(req.body);
    supplier.save()
        .then((supplier) => {
            if(!supplier) {
                next(createHttpError(StatusCodes.BAD_REQUEST, 'Supplier not created'))
            } else {
                res.status(StatusCodes.CREATED).json(supplier)
            }
        })
        .catch(next);
}

module.exports.list = (req, res, next) => {
    Supplier.find()
        .then((suppliers) => {
            if(!suppliers) {
                next(createHttpError(StatusCodes.NOT_FOUND, 'Suppliers not found'))
            } else {
                res.status(StatusCodes.OK).json(suppliers)
            }
        })
        .catch(next);
}

module.exports.getOne = (req, res, next) => {
    Supplier.findById(req.params.id)
        .then((supplier) => {
            if(!supplier) {
                next(createHttpError(StatusCodes.NOT_FOUND, 'Supplier not found'))
            } else {
                res.status(StatusCodes.OK).json(supplier)
            }
        })
        .catch(next);
}

//update

module.exports.update = (req, res, next) => {
    Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((supplier) => {
            if(!supplier) {
                next(createHttpError(StatusCodes.NOT_FOUND, 'Supplier not found'))
            } else {
                res.status(StatusCodes.OK).json(supplier)
            }
        })
        .catch(next);
}