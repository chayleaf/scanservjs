#!/usr/bin/env node
const express = require('express');
const Application = require('./application');
const application = new Application('/etc/scanservjs/config.local.js');
const config = application.config();
const app = express();
const ExpressConfigurer = require('./express-configurer');

ExpressConfigurer.with(app, application)
  .encoding()
  .statics()
  .basicAuth()
  .swagger()
  .endpoints();

const server = app.listen(config.port, config.host, () => {
  const log = require('loglevel').getLogger('server');
  log.info(`scanservjs started listening: https://${config.host}:${config.port}`);
});

server.setTimeout(config.timeout);
