'use strict';

const app = require('./src/config/app');
const server = require('http').createServer(app);
server.listen(process.env.PORT || 3000, function () {
    console.log('Start server');
    console.log('Server is running');
});