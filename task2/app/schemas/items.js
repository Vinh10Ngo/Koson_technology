const mongoose = require('mongoose')
const databaseConfigs = require(__path__configs + 'database')

const schema = new mongoose.Schema({ 
    title: String,
    content: String,
});

module.exports= mongoose.model(databaseConfigs.col_items, schema)