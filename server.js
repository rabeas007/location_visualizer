
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger= require('morgan')
const PointApi=require('./api/points')
const path = require("path")

if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }
// const PORT = 3001;
const app = express();
app.set( 'port', ( process.env.PORT || 8000 ));

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}
// app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(cors());

// const router = express.Router();

// this is our MongoDB database
const dbRoute = process.env.MONGODB_URI || 'mongodb+srv://rabeashamaly:rabeashamaly@cluster0-q1h8e.mongodb.net/in-door-locations?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//create an index to handle finding the points faster
db.collection('points').createIndex( { floor_id: 1,  start_date: 1, end_date: 1} );

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(logger('dev'));
// app.use(express.static(path.join(__dirname, "client", "build")))

// this is our get method
// this method fetches all available data in our database
app.get('/api/getPoints', PointApi.getPoints);

app.get('/api/getPointsByFloor', PointApi.getPointsByFloor)
// this is our add method
app.post('/api/addPoint', PointApi.addPoint);

// this is our delete method
// this method removes existing data in our database
// router.delete('/deleteData', (req, res) => {
//     const { id } = req.body;
//     Data.findByIdAndRemove(id, (err) => {
//         if (err) return res.send(err);
//         return res.json({ success: true });
//     });
// });

// append /api for our http requests
// app.use('/api', router);
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
// launch our backend into a port
app.listen(app.get( 'port' ), () =>console.log( 'Node server is running on port ' + app.get( 'port' )))
