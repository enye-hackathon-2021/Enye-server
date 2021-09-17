import { model, Schema } from 'mongoose';
import { ObjectId } from 'mongodb'

const questionSchema = new Schema({
  isAnswered: {
    type: Boolean,
    default: false,
  },
  question: {
    type: String,
    requried: true,
  },
  patient: {
    type: ObjectId,
    required: true,
    ref: 'Patient'
  }
});

export default model('Question', questionSchema);
