#!/usr/bin/env node

/**
 * Module dependencies.
 */

const url = "mongodb://localhost:27017/weather-maps-test";
const gmailUser = {
    user:'weathery.test@gmail.com',
    pass: 'hnfgc9RADxB8E8Zh36NBH3B'
};
var app = require('../app');
var db = require('./database');
var email = require('./email');
var debug = require('debug')('elearn:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Connect to a MongoDB instance and Listen on provided port, on all network interfaces.
 */

db.connect(url, function (e) {
    if (e) {
        console.log('WeatherMaps was unable to connect to MongoDB.');
        process.exit(1);
    } else {
        email.setUp(gmailUser);
        server.listen(port, () => console.log(`WeatherMaps listening on port ${port}!`));
        server.on('error', onError);
        server.on('listening', onListening);
    }
})

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

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
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}