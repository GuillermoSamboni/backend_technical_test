const { Schema, model } = require("mongoose");
const validator = require("validator");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
    },
    lastname: {
      type: String,
      required: [true, "User's last name required"],
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      unique: true,
      validate: [validator.isEmail, "Invalid email address"],
    },
    password: {
      type: String,
      required: [true, "The password is required"],
    },
    role: {
      //refers to the type of user
      ref: "role",
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const { hashPassword } = require("../helpers/BcryptHashedHelper");
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
    next();
  }
});

module.exports = model("user", UserSchema, "users_coll");
