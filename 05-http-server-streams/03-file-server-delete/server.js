const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const {stat, unlink} = require('fs/promises')

const server = new http.Server();

server.on('request', async (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'DELETE':
      if (path.parse(filepath).dir != path.join(__dirname, 'files')){
        res.statusCode = 400
        res.end('Wrong path!')
        return
      }
      try {
        await stat(filepath)
      } catch (err) {

        await unlink(filepath)
        res.statusCode = 201
        res.end('OK')
        return
      }

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
