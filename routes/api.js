var express = require('express');
var router = express.Router();
const {
    createParking, getParking, getsParking, deleteParking
} = require('../controllers/parking');
// const authMidleware = require('../midleware/authMidleware');


router.post('/', createParking);
// router.post('/', authMidleware, deleteParking);
// router.get('/:id', getParking);
// router.get('/', getsParking);


module.exports = router;
