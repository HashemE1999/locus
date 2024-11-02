const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please input a valid email!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  trips: [
    {
      type: Schema.Types.ObjectId,
      ref: "Trip",
    },
  ],
});

// Middleware called before an user is saved in the database to hash their password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    try {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
      console.log("Hashed!");
    } catch (e) {
      console.log(e);
    }
  }
  next();
});

// Method to compare incoming password with hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
