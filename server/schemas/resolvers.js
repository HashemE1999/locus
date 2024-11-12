const { User, Trip } = require("../models");
const { findById } = require("../models/Trip");
const { signToken, AuthenticationError } = require("../utils/auth");
const DateScalar = require("./DateScalar");

const resolvers = {
  Date: DateScalar,
  Query: {
    // Other query resolvers
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate(
          "trips"
        );
        return user;
      }
      throw AuthenticationError;
    },
    getTrip: async (parent, { tripId }) => {
      const trip = await Trip.findById(tripId);
      return trip;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // Create a new user
      const user = await User.create({ username, email, password });

      // Generate a token for the user
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      // Log existing user in
      const user = await User.findOne({ email });
      // Throws error if user does not exist
      if (!user) {
        throw AuthenticationError;
      }
      // Checks password for correctness
      const correctPw = await user.isCorrectPassword(password);
      // Throws error if password input is incorrect
      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    addTrip: async (parent, { attractions }, context) => {
      // Create a new trip with the provided attractions
      if (context.user) {
        const trip = await Trip.create({ attractions });
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { trips: trip._id } },
          { new: true }
        );
        return trip;
      }
      throw AuthenticationError;
    },
    removeTrip: async (parent, { tripId }, context) => {
      // Remove a trip by ID
      if (context.user) {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { trips: tripId } },
          { new: true }
        );
        const trip = await Trip.findByIdAndDelete(tripId);
        return trip;
      }
      throw AuthenticationError;
    },
    editTrip: async (parent, { tripId }, context) => {
      // Edit a trip by ID
      if (context.user) {
        const trip = await Trip.findByIdAndUpdate(tripId);
        return trip;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
