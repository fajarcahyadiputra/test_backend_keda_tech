const { Gift } = require('../../models')
const ErrorResponse = require('../../utils/ErrorResponse');

module.exports = async (req, res, next) => {
    try {
        const giftid = req.params.id;
        const gift = await Gift.findByPk(giftid);
        if (!gift) {
            return next(new ErrorResponse("gift not found", 404));
        }
        await gift.destroy();
        res.status(200).json({
            status: 'success',
            message: 'Successfully deleted',
        })
        next();
    } catch (error) {
        console.log(error.message);
        next(error)
    }
}