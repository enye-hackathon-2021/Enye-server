import { ObjectId } from 'mongodb';
import Question from '../models/Question';
import handleResponse from '../utils/response';

export const postQuestion = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { question } = req.body;

    const ques = await Question.create({
      patient: ObjectId(_id),
      question,
    });

    return handleResponse(res, 201, 'Question posted', { question: ques }) 
  } catch (error) {
    return next(error);
  }
};

export const getQuestion = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    
    const question = await Question.findOne({
      _id: ObjectId(questionId) 
    });

    if (!question) {
      throw new Error ('Question not found');
    }

    return handleResponse(res, 200, 'Question fetched', { question });
  } catch (error) {
    return next(error);
  }
};

export const getUserQuestions = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const userQuestions = await Question.find({
      patient: ObjectId(_id)
    });

    return handleResponse(res, 200, 'User questions fetched', { questions: userQuestions });
  } catch (error) {
    return next(error);
  }
};

export const getAllUnAnsweredQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find({
      isAnswered: false
    });

    return handleResponse(res, 200, 'Questions fetched', { questions });
  } catch (error) {
    return next(error);
  }
};
