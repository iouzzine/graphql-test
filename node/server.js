// Config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');

// listen on port config.port
app.listen(config.port, () => {
  console.info('##########################################################'),
    console.info('#####               STARTING SERVER                  #####'),
    console.info(
      '##########################################################\n'
    ),
    console.info(
      `App running on ${config.env.toUpperCase()} mode and listening on port ${
        config.port
      } ...`
    );
});
