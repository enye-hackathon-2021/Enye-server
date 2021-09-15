require('dotenv').config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Doctor from '../models/Doctor';
import Patient from '../models/Patient';
import handleResponse from '../utils/response';

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
    return handleResponse(res, 201, 'Login successful', {
      ...patient.toObject(), 
      password: undefined,
      token
    });
  } catch (error) {
    next(error);
  }
};
