const express = require('express'),
    authConfig = require('../config/auth');

const router = express.Router();

console.log('------------------', authConfig);

router.get('/balance', (req, res) => {
    res.render('index', {
        clientId: authConfig.googleAuth.clientId,
        layout: false,
    });
});

router.get('/planner', (req, res) => {
    res.render('index', {
        clientId: authConfig.googleAuth.clientId,
        layout: false,
    });
});

module.exports = router;
