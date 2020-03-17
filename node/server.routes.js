const router = require('express').Router();
const userCtrl = require('./controllers/user.controller');

module.exports = () => {
  router.get('/health-check', (req, res) => res.send('OK'));

  return router;
};
