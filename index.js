var polyserve = require('polyserve');

module.exports = function(gemini, opts) {
  var server;

  gemini.on('startRunner', function(runner) {
    console.log('Starting Polyserve ...');

    var cfg = {
      port: opts.port || 8080,
      hostname: opts.hostname || '127.0.0.1',
      root: opts.root || process.cwd()
    };

    return polyserve
      .startServer(cfg)
      .then(srv => server = srv)
      .then(console.log('Polyserve running.'))
      .catch(e => console.log('Error starting Polyserve ' + e));
  });

  gemini.on('endRunner', function(runner, data) {
    console.log('Polyserve closed.');
    return server.close();
  });
};
