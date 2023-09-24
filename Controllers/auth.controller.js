const User = require('../Models/User.model');
const { StatusCodes } = require('http-status-codes');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports.register = (req, res, next) => {
  if (req.file) {
    req.body.profilePicture = req.file.path;
  }

  User.create(req.body)
    .then(user => res.status(StatusCodes.CREATED).json(user))
    .catch(next)
}

module.exports.login = (req, res, next) => {
  const loginError = createError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
  const { email, password } = req.body;

  if (!email || !password) {
    return next(loginError);
  }

  // Check email
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return next(loginError)
      }

      // Check password
      return user.checkPassword(password)
        .then(match => {
          if (!match) {
            return next(loginError)
          }

          // Emitir y firmar un token jwt con la info del usuario
          const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || 'Super secret',
            {
              expiresIn: '1h'
            }
          )

          res.json({ accessToken: token })
        })
    })
    .catch(next)
}