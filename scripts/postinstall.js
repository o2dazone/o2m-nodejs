#!/usr/bin/env node
/* eslint no-console: 0*/
if (process.env.NODE_ENV !== 'production') {
  const path = require('path');
  const exec = require('child_process').exec;
  const cwd = process.cwd();

  const webpackPath = path.join(cwd, 'node_modules', '.bin', 'webpack');
  console.log('building webpack dll...');
  exec(`${webpackPath} --display-chunks --color --config vendor.webpack.config.js`, { cwd }, function (error, stdout) {
    if (error) {
      console.warn(error);
    }
    console.log(stdout);
  });
}