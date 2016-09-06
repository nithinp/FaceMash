var homPageAPI = require('./home-router');

module.exports = function (app) {
  app.use('*', homPageAPI);
};
