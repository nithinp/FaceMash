var bluebird = require('bluebird');

var create = function (model, dataJson) {
  var newJsonData = new model(dataJson);

  return model.update(
    {
      sheetName: newJsonData.sheetName,
      category: newJsonData.category,
      categoryID: newJsonData.categoryID
    },
    { $setOnInsert: newJsonData },
    { upsert: true, new: true }
    )
  .then(function(data){
    return data;
  }, function(err){
    return bluebird.reject(err);
  });

};

var retrieveData = function (model, sort, skip, limit) {
  return model.find(sort).skip(skip).limit(limit)
  .then(function (data) {
    return data;
  }, function (err) {
    return bluebird.reject(err);
  });
};

var updateData = function (model, id, newJsonObj) {
  return model.findByIdAndUpdate(id, {
    $set: {
      metaTitle: newJsonObj.metaTitle,
      metaDescription: newJsonObj.metaDescription
    }
  }, {
    new: true
  })
  .exec()
  .then(function (data) {
    return data;
  }, function (err) {
    return bluebird.reject(err);
  });
};

module.exports = {
  create: create,
  retrieveData: retrieveData,
  updateData: updateData
};
