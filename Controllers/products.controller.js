const createError = require("http-errors");
const Product = require("../Models/Product.model");
const { StatusCodes } = require("http-status-codes");

module.exports.create = (req, res, next) => {
  const product = new Product(req.body);
  product
    .save()
    .then((product) => res.status(StatusCodes.CREATED).json(product))
    .catch((error) => next(error));
};

module.exports.list = (req, res, next) => {
  Product.find()
    .then((products) => res.status(StatusCodes.OK).json(products))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        throw createError(StatusCodes.NOT_FOUND, "Product not found");
      } else {
        res.status(StatusCodes.OK).json(product);
      }
    })
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
        .then((product) => {
        if (!product) {
            throw createError(StatusCodes.NOT_FOUND, "Product not found");
        } else {
            res.status(StatusCodes.NO_CONTENT).json();
        }
        })
        .catch((error) => next(error));
    }