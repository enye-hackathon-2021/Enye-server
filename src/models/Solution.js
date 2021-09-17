import { model, Schema } from 'mongoose';
import { ObjectId } from 'mongodb'

const solutionSchema = new Schema({
  answer: {
    type: String,
    required: true
  },
  question: {
    type: ObjectId,
    requried: true,
    ref: 'Question',
  },
  doctor: {
    type: ObjectId,
    required: true,
    ref: 'Doctor',
  },
  patient: {
    type: ObjectId,
    required: true,
    ref: 'Patient',
  }
});

export default model('Solution', solutionSchema);

