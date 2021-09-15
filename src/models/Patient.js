import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const patientSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    set: (value) => value.toLowerCase()
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
  password: {
    type: String,
    required: true,
    set: (value) => {
      const hash = bcrypt.hashSync(value, 10);
      return hash;
    }
  }
}, {
  timestamps: true,
  toObject: {
    transform: (doc, ret) => {
      delete ret.__v
    }
  },
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v
    }
  }
});

patientSchema.statics.isEmailTaken = async function(email) {
  const patient = await this.findOne({ email });
  return !!patient;
};

export default model('Patient', patientSchema);
