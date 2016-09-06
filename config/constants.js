module.exports = {
  DB: {
    URL: 'mongodb://' + (process.env.DB_ADDRESS || 'localhost') + ':' + (process.env.DB_PORT || '27017') + '/' + (
      process.env.DB_NAME || 'facemash')
  },
  HOME_HTML_PATH: '/../../public/home.html'
};
