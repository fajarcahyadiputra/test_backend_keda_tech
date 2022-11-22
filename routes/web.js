const router = require('express').Router();
const { Parking } = require("../models");
const { Op } = require('sequelize');

router.get("/", async (req, res) => {
    const { date_in, date_out, start_price, end_price, vehicle_type } = req.query;
    let parkings;
    if (start_price) {
        parkings = await Parking.findAll({
            where: {
                [Op.or]: [
                    {
                        total_price: start_price ? {
                            [Op.between]: [start_price, end_price]
                        } : null
                    },
                    {
                        date_in: date_in ? {
                            [Op.between]: [date_in, date_out]
                        } : null
                    },
                    {
                        date_out: date_in ? {
                            [Op.between]: [date_in, date_out]
                        } : null
                    },
                    {
                        vehicle_type: {
                            [Op.eq]: vehicle_type ? vehicle_type : null
                        }
                    }
                ]
            }
        });
    } else {
        parkings = await Parking.findAll();
    }

    res.render("index", { parkings, query: req.query });
})

module.exports = router;