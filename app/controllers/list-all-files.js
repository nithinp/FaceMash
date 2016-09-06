var bluebird = require('bluebird');

var dbServices = require('../services/db-services.js');
var jsonDataModel = require('../models/json-file-schema.js');

var list = function (sort, skip, limit) {
  return dbServices.retrieveData(jsonDataModel, sort, skip, limit)
    .then(function (data) {
      return bluebird.resolve(data);
    }, function (err) {
      return bluebird.reject(err);
    });
};

module.exports = {
  list: list
};
