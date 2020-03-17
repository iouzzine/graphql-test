const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

// Require Schema Graphql
const userGraph = require('../models/user.graphql');

// Require && Run mongoDB
require('./mongoDB')();

// Init Express App
const app = express();

// Body Parser params and attache them to req.body
app.use(express.json({ extended: false, limit: '10mb' }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Require routes
const routes = require('../server.routes')(app);

// mount all routes on /api path
app.use('/api', routes);

// mount graphql
app.use(
  '/api/graphql',
  graphqlHTTP((req) => ({
    schema: userGraph,
    graphiql: true,
    context: {
      request: req
    }
  }))
);

// error handler
app.use((err, req, res, next) => {
  if (err)
    return res.json({
      status: false,
      message: "Don't try to do something not allowed !!"
    });
  next();
});

module.exports = app;
