var express = require('express');
var router = express.Router();

// Logout
router.get('/', (req, res) => {
    res.cookie('jwt', '', { httpOnly: true });
    res.cookie('refreshToken', '', { httpOnly: true });
    res.status(200).send({ 'logout': 'success' });
});

module.exports = router;
