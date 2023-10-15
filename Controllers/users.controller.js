//controladores de usuarios
const User = require("../Models/User.model");
const { StatusCodes } = require("http-status-codes");
const createHttpError = require("http-errors");
const mailer = require("../Config/nodemailer.config");

module.exports.create = (req, res, next) => {
  if (req.file) {
    req.body.profilePicture = req.file.path;
  }

  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      if (!user) {
        next(createHttpError(StatusCodes.BAD_REQUEST, "User not created"));
      } else {
        mailer.sendValidationEmail(user);
        res.status(StatusCodes.CREATED).json(user);
      }
    })
    .catch(next);
};

module.exports.activate = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, { active: true })
    .then(() => {
      res.redirect("http://localhost:5173/login");
    })
    .catch(next);
};

module.exports.list = (req, res, next) => {
  User.find()
    .then((users) => {
      if (!users) {
        next(createHttpError(StatusCodes.NOT_FOUND, "Users not found"));
      } else {
        res.status(StatusCodes.OK).json(users);
      }
    })
    .catch(next);
};

module.exports.getOne = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(createHttpError(StatusCodes.NOT_FOUND, "User not found"));
      } else {
        res.status(StatusCodes.OK).json(user);
      }
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  console.log("Update request received. ID:", req.params.id);
  console.log("Update request body:", req.body);
  try {
    User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    })
      .then((user) => {
        if (!user) {
          throw createHttpError(StatusCodes.NOT_FOUND, "User not found");
        } else {
          console.log("User updated successfully:", user);
          res.status(StatusCodes.OK).json(user);
        }
      })
      .catch(next);
  } catch (error) {
    next(error);
  }
};

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        next(createHttpError(StatusCodes.NOT_FOUND, "User not found"));
      } else {
        res.status(StatusCodes.OK).json(user);
      }
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUser)
    .then((user) => {
      if (!user) {
        next(createHttpError(StatusCodes.NOT_FOUND, "User not found"));
      } else {
        res.json(user);
      }
    })
    .catch(next);
};
