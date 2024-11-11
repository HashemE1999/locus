const { Schema, model } = require("mongoose");
const AttractionSchema = require("./Attraction");

const tripSchema = new Schema({
  attractions: [AttractionSchema],
});

const Trip = model("Trip", tripSchema);

module.exports = Trip;
