//controladores de usuarios
const User = require('../Models/User.model');

module.exports.create = (req, res, next) => {
    const user = new User(req.body);
    user.save()
        .then((user) => res.status(201).json(user))
        .catch(next);
}

module.exports.list = (req, res, next) => {
    User.find()
        .then((users) => res.status(200).json(users))
        .catch(next);
}