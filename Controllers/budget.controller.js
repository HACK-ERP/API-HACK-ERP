const createError = require("http-errors");
const Budget = require("../Models/Budget.model");
const { StatusCodes } = require("http-status-codes");

const Notification = require("../Models/Notifications.model");
const sendNotification = require("../Util/sendNotification");

module.exports.create = (req, res, next) => {
    console.log("Create request received. Body:", req.body);
    
    const budget = new Budget(req.body);
    budget.save()
        .then((budget) => {
            console.log("Budget created successfully:", budget);
            res.status(StatusCodes.CREATED).json(budget);
        })
        .catch((error) => next(error));

};


module.exports.list = (req, res, next) => {
  Budget.find()
    .populate([
      {
        path: "client",
        model: "Client",
      },
      {
        path: "products.product_id",
        model: "Product",
      },
    ])
    .then((budgets) => res.status(StatusCodes.OK).json(budgets))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  Budget.findById(req.params.id)
    .populate([
      {
        path: "client",
        model: "Client",
      },
      {
        path: "products.product_id",
        model: "Product",
      },
    ])
    .then((budget) => {
      if (!budget) {
        throw createError(StatusCodes.NOT_FOUND, "Budget not found");
      } else {
        res.status(StatusCodes.OK).json(budget);
      }
    })
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  Budget.findByIdAndDelete(req.params.id)
    .then((budget) => {
      if (!budget) {
        throw createError(StatusCodes.NOT_FOUND, "Budget not found");
      } else {
        res.status(StatusCodes.NO_CONTENT).json();
      }
    })
    .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
  const id = req.params.id;

  console.log("Update request received. ID:", id);
  Budget.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  })
    .then((budget) => {
      if (!budget) {
        throw createError(StatusCodes.NOT_FOUND, "Budget not found");
      } else {
        console.log("Budget updated successfully:", budget);
        res.status(StatusCodes.OK).json(budget);
      }
    })
    .catch((error) => next(error));
};

module.exports.statusUpdate = (req, res, next) => {
  const id = req.params.id;
  const status = req.body.status;

  console.log("Update request received. ID:", id);
  Budget.findByIdAndUpdate(
    id,
    { status },
    {
      runValidators: true,
      new: true,
    }
  )
    .then((budget) => {
      if (!budget) {
        throw createError(StatusCodes.NOT_FOUND, "Budget not found");
      } else {
        console.log("Budget updated successfully:", budget);
        res.status(StatusCodes.OK).json(budget);
      }
    })
    .catch((error) => next(error));
};
