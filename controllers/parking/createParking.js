const { Parking } = require('../../models')
const Joi = require('joi');
const ErrorResponse = require('../../utils/ErrorResponse');
const moment = require("moment");

const calculateParking = require("../../helpers/calculate_parking");

module.exports = async (req, res, next) => {
    try {
        const dataBody = req.body;
        const schema = Joi.object({
            plat_no: Joi.string().required(),
            date_in: Joi.date().required(),
            date_out: Joi.date().required(),
            vehicle_type: Joi.string().required().valid("car", "motorcycle")
        });

        // schema options
        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        };
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            return next(new ErrorResponse(error.details.map(item => {
                return {
                    message: item.message.replace(/[^\w.,\s]/g, ''),
                    field: item.path[0]
                }
            }), 400));
        }

        let price_total, total_times;
        const dateIN = moment(new Date(dataBody.date_in).toISOString()).format("MM-DD-YYYY HH:mm:SS");
        const dateOUT = moment(new Date(dataBody.date_out).toISOString()).format("MM-DD-YYYY HH:mm:SS");
        switch (dataBody.vehicle_type) {
            case "car":
                //calculate for car action
                const car = calculateParking(80000, 5000, dateIN, dateOUT);
                price_total = car.price_total;
                total_times = car.total_times;
                break;
            case "motorcycle":
                //calculate for motorcycle action
                const motorcycle = calculateParking(40000, 2000, dateIN, dateOUT);
                price_total = motorcycle.price_total;
                total_times = motorcycle.total_times;
            default:
                break;
        }

        dataBody.total_price = price_total;
        dataBody.total_times = total_times;
        const newParking = await Parking.create(dataBody);
        res.status(201).json({
            status: 'success',
            message: 'Successfully inserting'
        })
        next();
    } catch (error) {
        console.log(error.message);
        next(error)
    }
}