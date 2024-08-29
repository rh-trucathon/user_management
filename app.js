

const hostname = '127.0.0.1';
const port = 3000;
require('dotenv').config()

var express = require('express');
var app = express();
var http = require('http');
var morgan = require('morgan')
var debug = require('debug')
var cors = require('cors')


var csvReader = require('./business/CSVReader.js')

var csvReaderObj = new csvReader()

var bodyParser = require('body-parser');

var env = process.env.NODE_ENV || 'development'




app.set('port', port);
app.use(cors())
app.use(morgan('[:date[web]] :req[user-agent] :method :url :status :response-time ms - :res[content-length]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

csvReaderObj.readCSVFile(process.env.CSV_FILE_NAME)









// ...





var server = http.createServer(app);


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, function() {
  console.log("=== Server Informations===")
  console.log('GETECHDEV WEWINE 0.0.1 - listening on port : ' + server.address().port)
  debug('Express server listening on port ' + server.address().port);
});
server.on('error', onError);
server.on('listening', onListening);


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = app;


