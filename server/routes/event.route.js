let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// Event Model
let eventSchema = require('../models/Event');
let path = '/';

// CREATE Event
router.route(path).post((req, res, next) => {
    eventSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        };
    });
});

// READ Events
router.route(path).get((req, res) => {
    eventSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        };
    });
});

// Delete Event
router.route('/:id').delete((req, res, next) => {
    console.log("req.params : ", req.params.id);
    eventSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: "Event deleted"
            });
        };
    });
});

module.exports = router;