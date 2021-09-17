import mongoose, { model, Schema } from 'mongoose';
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

transactionSchema.pre('save', async function(next) {
  if (this.status !== 'successful') {
    // get the from and to
    const patient = await Patient.findOne({ _id: this.from });
    const doctor = await Doctor.findOne({ _id: this.to });
    const amount = this.amount;

    const finished = await debitWallet(amount, patient.walletId);
    const finished2 = await fundWallet(amount, doctor.walletId);

    // if (finished && finished2) {
    //   const transaction = await mongoose.models['Transaction'].findOne({ _id: this._id });
    //   transaction.status = 'successful';
    //   await transaction.save();
    // }
  }
  next();
});
export default model('Transaction', transactionSchema);
