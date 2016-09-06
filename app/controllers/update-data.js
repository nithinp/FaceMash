var dbServices = require('../services/db-services.js');
var jsonDataModel = require('../models/json-file-schema.js');
var bluebird = require('bluebird');
var awsUpload = require('../services/aws-services.js');
var _ = require('lodash');

var k = require('../../config/constants.js');

var update = function (objId, newObj) {
  return dbServices.updateData(jsonDataModel, objId, newObj)
    .then(function (data) {
      var filePath = 'JSON_Files/' + data.sheetName.trim() + '/' +
        data[k.DB_KEYS.CATEGORY].trim().replace(/\s>\s/g, '/');
      var jsonFilePath = filePath + '/' + data[k.DB_KEYS.CATEGORY_ID] + '.json';
      jsonFilePath = jsonFilePath.replace(/\s/g, '_');
      var obj = _.pick(data, [k.DB_KEYS.META_TITLE, k.DB_KEYS.META_DESCRIPTION]);
      return awsUpload(obj, jsonFilePath);
    }, function (err) {
      return bluebird.reject(err);
    });
};

module.exports = {
  update: update
};
