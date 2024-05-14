const { Schema, model, SchemaTypes } = require("mongoose");
const validator = require("validator");

const ProductSchema = new Schema(
  {
    name_prod: {
      type: String,
      required: [true, "The name product is required."],
    },
    price_prod: {
      type: String,
      required: [true, "The price is required."],
    },
    stock: {
      type: String,
      required: [true, "The stock is required."],
    },
    user: {
      ref: "user",
      type: SchemaTypes.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("product", ProductSchema, "products_coll");
