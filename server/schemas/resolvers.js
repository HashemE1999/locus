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
  },
};

module.exports = resolvers;
