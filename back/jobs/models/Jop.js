const mongoose = require("mongoose");
const { Schema } = mongoose;

const jopSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
      maxlength: 40,
    },
    position: {
      type: String,
      required: true,
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jop", jopSchema);
