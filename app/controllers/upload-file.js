var _ = require('lodash');
var bluebird = require('bluebird');
var xlsx = require('xlsx');
var awsUpload = require('../services/aws-services.js');
var dbServices = require('../services/db-services.js');
var jsonDataModel = require('../models/json-file-schema.js');
var path = require('path');

var k = require('../../config/constants.js');

var processFileUpload = function (uploadFile) {
  if (uploadFile && (path.extname(uploadFile.originalname) === '.xlsx' || path.extname(uploadFile.originalname) ===
      '.csv')) {
    var workbook = xlsx.readFile(uploadFile.path);
    var isValidFile = false;
    var totalNumberOfDocuments = 0;
    _.forEach(workbook.SheetNames, function (item) {
      var jsonArray = xlsx.utils.sheet_to_json(workbook.Sheets[item]);
      _.forEach(jsonArray, function (obj) {
        totalNumberOfDocuments = totalNumberOfDocuments + 1;
        if (obj && obj[k.EXCEL_HEADER.CATEGORY_ID] && obj[k.EXCEL_HEADER.CATEGORY]) {
          isValidFile = true;
        }
      });
    });
    if (!isValidFile) {
      var err = new Error('You must upload a file with valid keys.');
      err.status = 400;
      return bluebird.reject(err);
    }
    var count = 0;
    return bluebird.map(workbook.SheetNames, function (item) {
      var jsonArray = xlsx.utils.sheet_to_json(workbook.Sheets[item]);
      return bluebird.map(jsonArray, function (obj) {
        if (obj && obj[k.EXCEL_HEADER.CATEGORY_ID] && obj[k.EXCEL_HEADER.CATEGORY]) {
          count = count + 1;
          var newJsonData = {
            documentName: uploadFile.originalname,
            sheetName: item,
            categoryID: obj[k.EXCEL_HEADER.CATEGORY_ID],
            category: obj[k.EXCEL_HEADER.CATEGORY],
            metaTitle: obj[k.EXCEL_HEADER.META_TITLE],
            metaDescription: obj[k.EXCEL_HEADER.META_DESCRIPTION]
          };
          var awsData = {
            metaTitle: obj[k.EXCEL_HEADER.META_TITLE],
            metaDescription: obj[k.EXCEL_HEADER.META_DESCRIPTION]
          };
          var filePath = 'JSON_Files/' + item.trim() + '/' + obj[k.EXCEL_HEADER.CATEGORY].trim().replace(/\s>\s/g, '/');
          var jsonFilePath = filePath + '/' + obj[k.EXCEL_HEADER.CATEGORY_ID] + '.json';
          jsonFilePath = jsonFilePath.replace(/\s/g, '_');
          obj = _.omit(obj, [k.EXCEL_HEADER.CATEGORY_ID, k.EXCEL_HEADER.CATEGORY]);
          return bluebird.join(dbServices.create(jsonDataModel, newJsonData), awsUpload(awsData, jsonFilePath))
            .then(function (data) {
              var result = {
                totalNumber: totalNumberOfDocuments,
                processedNumber: count
              };
              return bluebird.resolve(result);
            }, function (err) {
              return bluebird.reject(err);
            });

        }
      }).then(function (data) {
        return bluebird.resolve(data);

      }, function (err) {
        return bluebird.reject(err);
      });
    }).then(function (data) {
      var result = {
        totalNumber: totalNumberOfDocuments,
        processedNumber: count
      };
      return bluebird.resolve(result);

    }, function (err) {
      return bluebird.reject(err);
    });
  } else {
    var error = new Error('You must upload a XLSX file.');
    error.status = 400;
    return bluebird.reject(error);
  }
};

module.exports = {
  processFileUpload: processFileUpload
};
