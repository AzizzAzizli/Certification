const mongoose =  require("mongoose");

const Schema = mongoose.Schema;

const certificateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    serialNumber: {
      type: String,
      required: true,
    },
    cetificateImg: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

module.exports =Certificate