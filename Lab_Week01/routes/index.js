var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My class' });
});

router.get('/welcome', function (req, res, next) {
  res.render('welcome', {title: 'COM6504'});
})

module.exports = router;
