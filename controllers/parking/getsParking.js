const { Gift } = require('../../models')
const ErrorResponse = require('../../utils/ErrorResponse');
const datatable = require('../../utils/datatable')

module.exports = async (req, res, next) => {
    try {
        const page = req.query.page;
        const perPage = req.query.perPage;
        const searchValue = req.query.searchValue;

        //datatable
        let datatableParams = {
            "columns": [
                {
                    "data": "id",
                },
                {
                    "data": "name",
                    "searchable": true,
                    "sortable": true
                },
                {
                    "data": "point",
                    "sortable": true
                },
                {
                    "data": "slug",
                    "searchable": true,
                    "sortable": true
                },
                {
                    "data": "averageRating",
                    "sortable": true
                },
                {
                    "data": "ratingStars",
                    "sortable": true
                },
                {
                    "data": "totalRating",
                    "sortable": true
                },
                {
                    "data": "image"
                }
            ],
            "order": {
                "column": "id",
                "dir": "asc"
            },
            "page": parseInt(page) || 1,
            "perPage": parseInt(perPage) || 10,
        }
        if (searchValue) {
            datatableParams.search = {
                "value": `${searchValue}`
            }
        }
        console.log(datatableParams);
        let datatableBody = await datatable(datatableParams);
        const gifts = await Gift.findAndCountAll({
            ...datatableBody
        });
        res.status(200).json({
            status: 'success',
            data: gifts.rows,
            recordsTotal: gifts.count
        })
        next();
    } catch (error) {
        console.log(error.message);
        next(error)
    }
}