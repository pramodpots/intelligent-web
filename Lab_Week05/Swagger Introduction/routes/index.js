var express = require('express');
var router = express.Router();


router.get('/adult', function(req, res, next) {
  res.render('adult', { title: 'My Form' });
});
router.get('/', function(req, res, next) {
  res.render('adult', { title: 'My Form' });
});

router.get('/child', function(req, res, next) {
  res.render('child', { title: 'My Form' });
});

/* post to adult page. */
router.post('/adult', function(req, res, next) {
  let body= req.body;
  let age= body.age;
  let height= body.height;
  let weight= body.weight;
  console.log('received: age: '+ age+ ' height:'+ height+ ' weight:'+ weight);

  if (isNaN(age))
    res.status(401).end('age is not a number');
  else if (isNaN(height))
    res.status(401).end('height is not a number');
  else if (isNaN(weight))
    res.status(401).end('weight is not a number');
  else res.json(body);
});

/* post to the children page. */
router.post('/child', function(req, res, next) {
  let body= req.body;
  let age= body.age;
  let parent= body.parent;

  console.log('received: age: '+ age+ +' parent '+ JSON.stringify(parent));
  if (isNaN(age))
    res.status(401).end('age is not a number');
  else if (!parent || !parent.name || !parent.surname)
    res.status(401).end('the parent is either not provided or not containing a name and an surname '+ JSON.stringify(parent));
  else res.json(body);
});

module.exports = router;
