import { ObjectId } from 'mongodb';
import Solution from '../models/Solution';
import Question from '../models/Question';
import Transaction from '../models/Transaction';
import handleResponse from '../utils/response';

export const postSolution = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const {
      questionId,
      answer,
    } = req.body;

    const question = await Question.findOne({
      _id: ObjectId(questionId)
    });

    if (!question) {
      throw new Error('Question not found');
    }

    const solution = await Solution.create({
      answer,
      question: ObjectId(questionId),
      doctor: ObjectId(_id),
      patient: ObjectId(question.patient) 
    });
    
    question.isAnswered = true;
    await question.save();
    // Create a new transaction
    const tx = new Transaction({
      from: ObjectId(question.patient),
      to: ObjectId(_id),
      amount: 20,
      status: 'pending',
    });
    await tx.save();
  
    return handleResponse(res, 201, 'Solution submitted', { solution });
  } catch (error) { 
    return next(error);
  }
};

export const getQuestionSolution = async (req, res, next) => {
  try { 
    const { questionId } = req.params;

    const solution = await Solution.findOne({
      questionId: ObjectId(questionId)
    });
    
    if (!solution) {
      return handleResponse(res, 200, 'Question has no solution');
    }

    return handleResponse(res, 200, 'Solution fetched', { solution });
  } catch (error) {
    return next(error)
  }
};

export const getUserSolutions = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const solutions = await Solution.find({
      patient: ObjectId(_id)
    }).populate('question').exec();

    return handleResponse(res, 200, 'Solutions fetched', { solutions })
  } catch (error) {
    return next(error);
  }
};

export const getDoctorSolutions = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const solutions = await Solution.find({
      doctor: ObjectId(_id)
    }).populate('question').exec();

    return handleResponse(res, 200, 'Solutions fetched', { solutions })
  } catch (error) {
    return next(error);
  }
};
