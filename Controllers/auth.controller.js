const User = require("../Models/User.model");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const mailer = require("../Config/nodemailer.config");

module.exports.activate = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw createError(StatusCodes.NOT_FOUND, "User not found");
      } else if (user.active) {
        throw createError(StatusCodes.CONFLICT, "User already active");
      } else {
        user.active = true;
        return user.save();
      }
    })
    .then((user) => res.status(StatusCodes.OK).json(user))
    .catch(next);
};

module.exports.loginMail = (req, res, next) => {
  const loginError = createError(
    StatusCodes.UNAUTHORIZED,
    "Invalid email or password"
  );
  const { email, password } = req.body;

  if (!email || !password) {
    return next(loginError);
  }
  // Check email
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return next(loginError);
      }
      // Check password
      return user.checkPassword(password).then((match) => {
        if (!match) {
          return next(loginError);
        }

        // Emitir y firmar un token jwt con la info del usuario
        const token = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET || "Super secret",
          {
            expiresIn: "1h",
          }
        );

        res.json({ accessToken: token });
      });
    })
    .catch(next);
};

module.exports.loginPhone = (req, res, next) => {
  const loginError = createError(
    StatusCodes.UNAUTHORIZED,
    "Invalid email or password"
  );
  const { phone, password } = req.body;

  if (!phone || !password) {
    return next(loginError);
  }

  // Check phone
  User.findOne({ phone })
    .then((user) => {
      if (!user) {
        return next(loginError);
      }

      // Check password
      return user.checkPassword(password).then((match) => {
        if (!match) {
          return next(loginError);
        }

        // Emitir y firmar un token jwt con la info del usuario
        const token = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET || "Super secret",
          {
            expiresIn: "1h",
          }
        );

        res.json({ accessToken: token });
      });
    })
    .catch(next);
};
