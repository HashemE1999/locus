const { Schema, model } = require("mongoose");

const tripSchema = new Schema({
  attractions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Attraction",
    },
  ],
});

const Trip = model("Trip", tripSchema);

module.exports = Trip;
