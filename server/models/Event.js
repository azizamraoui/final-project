const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
    title: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    }
}, {
    collection: 'events'
})

module.exports = mongoose.model('Event', eventSchema)