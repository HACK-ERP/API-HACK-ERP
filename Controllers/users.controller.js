//controladores de usuarios
const User = require('../Models/User.model');
const { StatusCodes } = require('http-status-codes');
const createHttpError = require('http-errors');
const mailer = require('../Config/nodemailer.config');

module.exports.create = (req, res, next) => {
    if (req.file) {
        req.body.profilePicture = req.file.path;
      }
    
    const user = new User(req.body);
    user.save()
        .then((user) => {
            if(!user) {
                next(createHttpError(StatusCodes.BAD_REQUEST, 'User not created'))
            } else {
                mailer.sendValidationEmail(user);
                res.status(StatusCodes.CREATED).json(user)
            }
        })
        .catch(next);
}

module.exports.list = (req, res, next) => {
    User.find()
        .then((users) => {
            if(!users) {
                next(createHttpError(StatusCodes.NOT_FOUND, 'Users not found'))
            } else {
                res.status(StatusCodes.OK).json(users)
            }
        })
        .catch(next);
}

module.exports.getCurrentUser = (req, res, next) => {
    User.findById(req.currentUser)
      .then(user => {
        if (!user) {
          next(createHttpError(StatusCodes.NOT_FOUND, 'User not found'))
        } else {
          res.json(user)
        }
      })
      .catch(next)
  }