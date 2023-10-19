const mongoose = require('mongoose');
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');

const OT = require('../Models/oT.model');

module.exports.getRequiredMaterials = (req, res, next) => {
    const { otId } = req.params;
    OT.findOne({ _id: otId })
        .then((ot) => {
            console.log("entrando al then");
            ot.requiredMaterials
                .then((requiredMaterials) => {
                    console.log(requiredMaterials);
                    res.status(StatusCodes.OK).json(requiredMaterials);
                })
                .catch((e) => {
                    console.error("Error al obtener requiredMaterials:", e);
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
                });
        })
        .catch((e) => {
            console.error("Error al buscar OT:", e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
        });
}



