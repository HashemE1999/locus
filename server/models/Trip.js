const { Schema, model } = require("mongoose");
const AttractionSchema = require("./Attraction");

const tripSchema = new Schema({
  attractions: [AttractionSchema],
  created: {
    type: Date,
    default: Date.now,
  },
});

const Trip = model("Trip", tripSchema);

module.exports = Trip;
