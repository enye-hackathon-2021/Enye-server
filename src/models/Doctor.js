import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const doctorSchema = new Schema({
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
  field: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    required: true,
    enum: [
      'entry-level',
      'intermediate',
      'mid-level',
      'senior'
    ]
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

doctorSchema.statics.isEmailTaken = async function(email) {
  const doc = await this.findOne({ email });
  return !!doc;
};

export default model('Doctor', doctorSchema);
