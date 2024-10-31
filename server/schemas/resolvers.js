const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // Other query resolvers
    getTrips: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("trips");
      }
      throw AuthenticationError;
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
  },
};

module.exports = resolvers;
