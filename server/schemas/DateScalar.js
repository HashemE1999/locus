import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    // Convert outgoing Date to ISO string
    if (value instanceof Date) {
      return value.toISOString();
    } else {
      throw new Error("Invalid date value");
    }
  },
  parseValue(value) {
    // Convert incoming string to Date
    const date = new Date(value);
    if (isNaN(date)) {
      throw new Error("Invalid date value");
    }
    return date;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      const date = new Date(ast.value);
      if (isNaN(date)) {
        throw new Error("Invalid date value");
      }
      return date;
    }
    return null;
  },
});

module.exports = dateScalar;
