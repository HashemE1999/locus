// This model is based on the API documentation from the Points of Interest
// https://developers.amadeus.com/self-service/category/destination-experiences/api-doc/points-of-interest/api-reference
const mongoose = require("mongoose");
const { Schema } = mongoose;

const AttractionSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  attractionId: {
    type: Number,
    required: true,
  },
});

module.exports = AttractionSchema;
