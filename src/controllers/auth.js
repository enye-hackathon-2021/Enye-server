require('dotenv').config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Doctor from '../models/Doctor';
import Patient from '../models/Patient';
import handleResponse from '../utils/response';
import { createWallet, fundWallet, getWalletBalance } from '../utils/wallet';

export const register = async (req, res, next) => {
  try {
    const {
      role,
      email,
      name,
      password,
      age,
      gender,
      field, 
      experienceLevel
    } = req.body;

    let emailTaken = await Doctor.isEmailTaken(email);

    if (emailTaken === true) {
      throw new Error('Email has been used to create a doctor account')
    }

    emailTaken = await Patient.isEmailTaken(email); 

    if (emailTaken === true) {
      throw new Error('Email has been used to create a patient account')
    }

    // Create wallet for user
    const walletId = await createWallet(email);

    // Depending on the role 
    if (role === 'doctor') {
      const doctor = await Doctor.create({
        email,
        name,
        password,
        age,
        gender,
        field,
        experienceLevel,
        walletId
      });
      // Generate token
      const token = jwt.sign({ ...doctor.toObject(), password: undefined }, process.env.JWT_SECRET);
      return handleResponse(res, 201, 'Register successful', {
        ...doctor.toObject(), 
        password: undefined,
        token
      });
    }

    // patient role
    const patient = await Patient.create({
      email,
      name, 
      password,
      age,
      gender,
      walletId
    });

    const token = jwt.sign({ ...patient.toObject(), password: undefined }, process.env.JWT_SECRET);
    return handleResponse(res, 201, 'Register successful', {
      ...patient.toObject(),
      password: undefined,
      token
    });
  } catch (error) {
    next(error)
  }
};

export const login = async (req, res, next) => {
  try {
    const {
      role,
      email,
      password
    } = req.body;

    if (role === 'doctor') {
      const doctor = await Doctor.findOne({ email });
      
      if (!doctor) {
        throw new Error('Account not found');
      }
      const passwordMatch = await bcrypt.compare(password, doctor.password);
      if (!passwordMatch) {
        throw new Error('Incorrect password');
      }


      const token = jwt.sign({ ...doctor.toObject(), password: undefined }, process.env.JWT_SECRET);
      return handleResponse(res, 201, 'Login successful', {
        ...doctor.toObject(), 
        password: undefined,
        token
      });
    }

    const patient = await Patient.findOne({ email });
    
    if (!patient) {
      throw new Error('Account not found');
    }
    const passwordMatch = await bcrypt.compare(password, patient.toObject().password);
    if (!passwordMatch) {
      throw new Error('Incorrect password');
    }


    const token = jwt.sign({ ...patient.toObject(), password: undefined }, process.env.JWT_SECRET);
    return handleResponse(res, 200, 'Login successful', {
      ...patient.toObject(), 
      password: undefined,
      token
    });
  } catch (error) {
    next(error);
  }
};

export const getUserBalance = async (req, res, next) => {
  try {
    const { walletId } = req.user;
    const balance = await getWalletBalance(walletId);
    return handleResponse(res, 200, 'Balance fetched', { balance } );
  } catch (error) {
    return next(error);
  }
};

export const fundUserWallet = async (req, res, next) => {
  try {
    const { walletId } = req.user;
    const { amount } = req.body;

    await fundWallet(parseInt(amount, 10), walletId);
    return handleResponse(res, 200, 'wallet funded')
  } catch (error) {
    return next(error);
  }
};
