import mongoose, { Document, Schema } from "mongoose";

export interface Car extends Document {
  dealerId: mongoose.Types.ObjectId;
  carMakeId: mongoose.Types.ObjectId;
  name: string;
  price: string;
  year: string;
  color: string;
}

const carSchema = new Schema<Car>(
  {
    dealerId: {
      type: Schema.Types.ObjectId,
      ref: "CarDealer",
      required: true,
    },
    carMakeId: {
      type: Schema.Types.ObjectId,
      ref: "CarMake",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Price is required"],
      trim: true,
    },
    year: {
      type: String,
      required: [true, "Year is required"],
      trim: true,
    },
    color: {
      type: String,
      required: [true, "Color is required"],
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
          dealerId: ret.dealerId,
          carMakeId: ret.carMakeId,
          name: ret.name,
          price: ret.price,
          year: ret.year,
          color: ret.color,
        };
      },
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        return {
          id: ret._id,
          dealerId: ret.dealerId,
          carMakeId: ret.carMakeId,
          name: ret.name,
          price: ret.price,
          year: ret.year,
          color: ret.color,
        };
      },
    },
  }
);

export default mongoose.model<Car>("Car", carSchema);
