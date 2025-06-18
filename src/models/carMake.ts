import mongoose, { Document, Schema } from "mongoose";

export interface CarMake extends Document {
  country: string;
  brand: string;
}

const makeSchema = new Schema<CarMake>(
  {
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        return {
          id: ret._id,
          country: ret.country,
          brand: ret.brand,
        };
      },
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        return {
          id: ret._id,
          country: ret.country,
          brand: ret.brand,
        };
      },
    },
  }
);

export default mongoose.model<CarMake>("CarMake", makeSchema);
