const { Schema, model, SchemaTypes } = require("mongoose");

const RoleSchema = new Schema(
  {
    name_role: {
      type: String,
      required: [true, "The name role is required."],
    },
    description_role: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("role", RoleSchema, "roles_coll");
