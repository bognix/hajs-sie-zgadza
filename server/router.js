const express = require('express');

const router = express.Router();

router.get('/balance', (req, res) => {
    res.render('index', {
        layout: false
    });
});

router.get('/planner', (req, res) => {
    res.render('index', {
        layout: false
    });
});

router.use((req, res) => {
    res.render('index', {
        layout: false
    });
});

module.exports = router;
