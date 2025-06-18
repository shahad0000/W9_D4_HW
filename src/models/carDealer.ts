import mongoose, { Document, Schema } from 'mongoose';

export interface CarDealer extends Document {
    name: string;
    email: string;
    city: string;
  }

  const dealerSchema = new Schema<CarDealer>(
    {
      name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
      },
      city: {
        type: String,
        required: [true, 'City is required'],
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
            name: ret.name,
            email: ret.email,
            city: ret.city,
          };
        },
      },
      toObject: {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
          return {
            id: ret._id,
            name: ret.name,
            email: ret.email,
            city: ret.city,
          };
        },
      },
    }
  );
  
  export default mongoose.model<CarDealer>('CarDealer', dealerSchema);