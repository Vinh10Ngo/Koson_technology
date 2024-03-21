const mongoose = require('mongoose');
const databaseConfig  = require(__path_configs + 'database');

var schema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
})
module.exports = mongoose.model(databaseConfig.col_tasks, schema)