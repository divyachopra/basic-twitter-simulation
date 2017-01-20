/**
 * Created by Divya Chopra on 1/19/2017.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: "Chirp"});
});

module.exports = router;
