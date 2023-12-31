const createError = require("http-errors");
const Notification = require("../Models/Notifications.model");
const { StatusCodes } = require("http-status-codes");

module.exports.create = (req, res, next) => {
    const notification = new Notification(req.body);
    notification.save()
        .then(notification => res.status(StatusCodes.CREATED).json(notification))
        .catch(error => next(error));
}

module.exports.list = (req, res, next) => {
    Notification.find()
        .populate('sender')
        .then(notifications => {
            notifications.forEach(notification => {
                if (notification.sender) {
                    notification.sender.password = undefined;
                }
            });
            res.status(StatusCodes.OK).json(notifications);
        })
        .catch(error => {
            next(error);
        });
}

module.exports.detail = (req, res, next) => {
    Notification.findById(req.params.id)
        .populate({
            path: 'sender',
            model: 'User',
        })
        .then(notification => {
            if (!notification) {
                throw createError(StatusCodes.NOT_FOUND, "Notification not found");
            } else {
                res.status(StatusCodes.OK).json(notification);
            }
        })
        .catch(error => next(error));
}

module.exports.update = (req, res, next) => {
    console.log("Update request received. Body:", req.body);
    const id = req.params.id;
    const status = req.body.status;

    console.log("Update request received. ID:", id);
    Notification.findByIdAndUpdate(id, { status }, {
        runValidators: true,
        new: true,
    })
        .then(notification => {
            if (!notification) {
                throw createError(StatusCodes.NOT_FOUND, "Notification not found");
            } else {
                res.status(StatusCodes.OK).json(notification);
            }
        })
        .catch(error => {
            console.log(error);
            next(error)});
}


