var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {

    res.render('index', {
        layout: false,
    });
});

router.get('/balance', function(req, res) {
    res.render('index', {
        layout: false,
    });
});

router.get('/planner', function(req, res) {
    res.render('index', {
        layout: false,
    });
});

module.exports = router;
