import { model, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { debitWallet, fundWallet } from '../utils/wallet';
import Doctor from './Doctor';
import Patient from './Patient';

const transactionSchema = new Schema({
  from: {
    type: ObjectId,
    required: true,
    ref: Patient,
  },
  to: {
    type: ObjectId,
    required: true,
    ref: Doctor,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'failed', 'successful'],
    default: 'pending',
  }
});

export default model('Transaction', transactionSchema);

transactionSchema.post('save', async function(doc, next) {
  if (doc.status !== 'successful') {
    // get the from and to
    const patient = await Patient.findOne({ _id: doc.from });
    const doctor = await Doctor.findOne({ _id: doc.to });
    const amount = await doc.amount;

    await debitWallet(amount, patient.walletId);
    await fundWallet(amount, doctor.walletId);

  }
  next();
});
