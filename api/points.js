// import {INTERNAL_SERVER_ERROR, CREATED} from 'http-status-codes';
// import Point from '../models/Point';

var HttpStatus = require('http-status-codes')
let Point=require('../models/Point')

class PointsApi {
    static getPoints(req, res) {
        Point.find({}, async (err, points) => {
            if (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
                return;
            }
            if (!points) {
                res.send({});
                return;
            }
            res.send(points);
        });
    }

    static getPointsByFloor(req, res) {
        const floor_id = req.query.floor_id;
        const current = req.query.current;
        const next = req.query.next;
        Point.find({floor_id, $or:[{start_time: {$gte: current, $lte: next}}, {end_time: {$gte: current, $lte: next}}]}, async (err, points) => {
            if (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
                return;
            }
            if (!points) {
                res.send({});
                return;
            }
            // res.send('{"message":"Hello from the custom server!"}');
            res.send(points);
        });
    }

    static addPoint(req, res) {
        const {id_number, badge_type_desc, start_date, end_date, x, y, room, floor_id,
            x_start_time, x_end_time} = req.body;
        Point.create({ id_number, badge_type_desc, start_date, end_date, x, y, room, floor_id,
            x_start_time, x_end_time }, (err) => {
            if (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
            } else {
                res.status(HttpStatus.CREATED).send();
            }
        });
    }


}

module.exports = PointsApi;
