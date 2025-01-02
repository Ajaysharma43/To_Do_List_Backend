const mongoose = require('mongoose')

const Users_Schemma = new mongoose.Schema({
    TaskName:{type:String},
    Task:{type:String}
})

module.exports = mongoose.model('table1',Users_Schemma)