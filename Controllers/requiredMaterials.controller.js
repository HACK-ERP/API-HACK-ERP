const mongoose = require('mongoose');
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');

const OT = require('../Models/oT.model');

module.exports.getRequiredMaterials = async (req, res, next) => {
    const { otId } = req.params;

    try {
        const ot = await OT.findOne({ _id: otId })

        if (!ot) {
            throw createError(StatusCodes.NOT_FOUND, "OT not found");
        }

        console.log("entrando al then");
        console.log(ot);

        // Si requiredMaterials es una lista y deseas acceder a sus elementos
        // asegúrate de usar await
        const requiredMaterials = await ot.requiredMaterials;
        console.log(requiredMaterials);

        res.status(StatusCodes.OK).json(requiredMaterials);
    } catch (e) {
        console.error("Error al buscar OT:", e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
    }
}
