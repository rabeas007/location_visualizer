// /backend/Point.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const DataSchema = new Schema(
    {
        id: Number,
        message: String,
        id_number: Number,
        badge_type_desc: String,
        x: Number,
        y: Number,
        room: Number,
        floor_id: Number,
        start_time: Number,
        end_time: Number
    },
    { timestamps: true },
    {useUnifiedTopology: true}
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("points", DataSchema);