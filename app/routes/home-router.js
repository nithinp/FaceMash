var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var k = require('../../config/constants.js');

router.get('/', function (req, res, next) {
  var filePath = path.resolve(__dirname + k.HOME_HTML_PATH);
  fs.createReadStream(filePath).pipe(res);
});

module.exports = router;
