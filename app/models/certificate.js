import mongoose, { Schema } from "mongoose";


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

const Certificate = mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);

export default Certificate