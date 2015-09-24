# live-require

live require for nodejs module


# example:

```js
var express = require('express');
var router = express.Router();
var live = function(p){return require('live')(require.resolve(p))};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cgi', function(req, res, next) {
	live('./cgi')(req, res);
});

module.exports = router;

```
when './cgi' file changed, and recive a new request, './cgi' will be reload.
