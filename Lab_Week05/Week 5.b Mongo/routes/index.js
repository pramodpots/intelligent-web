const express = require('express');
const router = express.Router();

var character = require('../controllers/characters');
var initDB = require('../controllers/init');
initDB.init();


/* GET home page. */
router
    .get('/index', function (req, res, next) {
        res.render('index', {title: 'Get Character Age'});
    })
    .post('/index', character.getAge);

module.exports = router;
