const express = require('express');
const APP = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config({ path: `./.env` });
const HOST = process.env.HOST;
const PORT = process.env.PORT;

APP.use(cors());
APP.use(bodyParser.json({})); // for parsing application/json
APP.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
APP.use('/download', express.static('downloads'));

// Redis Connection
const Redis = require('./app/connections/Redis');
APP.set('redis', Redis);

// DB Connection
const { connect, syncDB } = require('./app/models');
(async () => {
    await connect();
    // await syncDB(); // <-- Creates tables
})();

// Routes
const AdminRoute = require('./app/routers/Admin');
APP.use('/admin', new AdminRoute(APP));
const UserRoute = require('./app/routers/User');
APP.use('/api', new UserRoute(APP));

// Start Server
APP.listen(PORT, HOST, () => {
    console.log(`\x1b[34m[APP]\x1b[0m Listening on ====>`, `\x1b[34mhttp://${HOST}:${PORT}\x1b[0m`);
});