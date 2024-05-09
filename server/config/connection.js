require("dotenv").config();
const mongoose = require('mongoose');
// configurates a DB travel-agency-db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travel-agency-db');

module.exports = mongoose.connection;
