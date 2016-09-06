var dbServices = require('../services/db-services.js');
var jsonDataModel = require('../models/json-file-schema.js');
var bluebird = require('bluebird');
var _ = require('lodash');

var listRegions = function () {
  return dbServices.retrieveData(jsonDataModel, {})
    .then(function (data) {
      var count = {
      };
      var regions = [];
      _.forEach(data, function(item) {
        if (item.sheetName && !_.includes(regions, item.sheetName)) {
          regions.push(item.sheetName);
          count[item.sheetName] = 1;
        } else if (item.sheetName && _.includes(regions, item.sheetName)) {
          count[item.sheetName] = count[item.sheetName] + 1;
        }
      });
      return bluebird.resolve({
        regions: regions,
        totalNumberOfItems: count
      });
    }, function (err) {
      return bluebird.reject(err);
    });
};


module.exports = {
  listRegions: listRegions
};
