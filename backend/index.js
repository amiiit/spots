var express = require('express');

const backend = function (options) {
  console.assert(options.port);
  const app = express();

  app.get('/places', function (req, res) {
    res.append('Access-Control-Allow-Origin', '*')
    res.json({data: options.data});
  });

  app.listen(options.port);

  console.log(`Dev backend is running on port ${options.port}`);
}

module.exports = backend;
