const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // Other query resolvers
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
    addTrip: async (parent, { attractions }) => {
      // Create a new trip with the provided attractions
      const trip = await Trip.create({ attractions });
      return trip;
    }
  },
};

module.exports = resolvers;
