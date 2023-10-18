const createError = require("http-errors");
const OT = require("../Models/oT.model");
const Notification = require("../Models/Notifications.model");

const { StatusCodes } = require("http-status-codes");

module.exports.create = (req, res, next) => {
  console.log("Create request received. Body:", req.body);
  const ot = new OT(req.body);
  const sender = req.body.userId;
  ot.save()
    .then(
      (ot) =>{
        const notification = new Notification({
          sender: sender,
          receiver: "Producción",
          message: `Se ha creado una la OT ${req.body.code}`,
        });
      notification.save();
      console.log("OT created successfully:", ot);

      res.status(StatusCodes.CREATED).json(ot)
      }
        
        
    )
    .catch((error) => next(error));
};

module.exports.list = (req, res, next) => {
  console.log("List request received.");
  OT.find()
    .populate({
      path: "budget",
      model: "Budget",
    })
    .then((ots) => {
      res.status(StatusCodes.OK).json(ots);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getOne = (req, res, next) => {
  console.log("Get request received. Params:", req.params);
  OT.findById(req.params.id)
    .populate({
      path: "budget",
      model: "Budget",
    })
    .then((ot) => {
      if (ot) {
        res.status(StatusCodes.OK).json(ot);
      } else {
        next(createError(StatusCodes.NOT_FOUND, "OT not found"));
      }
    })
    .catch((error) => next(error));
};

// module.exports.update = (req, res, next) => {
//   const id = req.params.id;
//   console.log("Update request received. Params:", req.params);
//   OT.findByIdAndUpdate(id, req.body, {
//     runValidators: true,
//     new: true,
//   })
//     .populate("products.product_id")
//     .populate("client.client_id")
//     .then((ot) => {
//       if (!ot) {
//         throw createError(StatusCodes.NOT_FOUND, "OT not found");
//       } else {
//         console.log("OT updated successfully:", ot);
//         res.status(StatusCodes.OK).json(ot);
//       }
//     })
//     .catch((error) => next(error));
// };
//delete

module.exports.delete = (req, res, next) => {
  console.log("Delete request received. Params:", req.params);
  OT.findByIdAndDelete(req.params.id)
    .then((ot) => {
      if (!ot) {
        throw createError(StatusCodes.NOT_FOUND, "OT not found");
      } else {
        res.status(StatusCodes.NO_CONTENT).json();
      }
    })
    .catch((error) => next(error));
};
