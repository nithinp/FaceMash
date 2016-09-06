var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jsonFileSchema = new Schema({
  documentName: {
    type: String,
    required: true
  },
  sheetName: {
    type: String,
    required: true
  },
  categoryID: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  metaTitle: {
    type: String
  },
  metaDescription: {
    type: String
  }
}, {
  timestamps: true
});

var JsonFiles = mongoose.model('JsonFile', jsonFileSchema);

module.exports = JsonFiles;
