const createError = require('http-errors');
const Client = require('../Models/Clients.model');
const { StatusCodes } = require('http-status-codes');

module.exports.create = (req, res, next) => {
    console.log('Create request received. Body:', req.body);
    const client = new Client(req.body);
    client.save()
        .then((client) => res.status(StatusCodes.CREATED).json(client))
        .catch((error) => next(error));
};

module.exports.list = (req, res, next) => {
    console.log('List request received.');
    Client.find()
        .then((clients) => res.status(StatusCodes.OK).json(clients))
        .catch((error) => next(error));
};

module.exports.get = (req, res, next) => {
    console.log('Get request received. Params:', req.params);
    Client.findById(req.params.id)
        .then((client) => {
            if (client) {
                res.status(StatusCodes.OK).json(client);
            } else {
                next(createError(StatusCodes.NOT_FOUND, 'Client not found'));
            }
        })
        .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
    const id = req.params.id;
    console.log('Update request received. Params:', req.params);
    Client.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true })
        .then((client) => {
            if (!client) {
                throw createError(StatusCodes.NOT_FOUND, 'Client not found');
            } else {
                console.log('Client updated successfully:', client);
                res.status(StatusCodes.OK).json(client);
            }
        })
        .catch((error) => next(error))
}

module.exports.delete = (req, res, next) => {
    const id = req.params.id;
    console.log('Delete request received. Params:', req.params);
    Client.findByIdAndDelete(id)
        .then((client) => {
            if (!client) {
                throw createError(StatusCodes.NOT_FOUND, 'Client not found');
            } else {
                console.log('Client deleted successfully:', client);
                res.status(StatusCodes.NO_CONTENT).json();
            }
        })
        .catch((error) => next(error));
}