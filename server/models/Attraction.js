// This model is based on the API documentation from the Points of Interest
// https://developers.amadeus.com/self-service/category/destination-experiences/api-doc/points-of-interest/api-reference
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

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
  category: {
    type: String,
    required: true,
    uppercase: true,
  },
  rank: {
    type: Number,
    required: true,
    min: 1,
  },
  tags: {
    type: [String],
    default: [],
  },
});

module.exports = model("Attraction", AttractionSchema);
