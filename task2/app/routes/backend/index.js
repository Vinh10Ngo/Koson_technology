var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/items', require('./items'));





module.exports = router;
