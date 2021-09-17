require('dotenv').config();
import axios from 'axios';

const endpoints = Object.freeze({
  CREATE_WALLET: 'https://api.getwallets.co/v1/wallets',
  GET_BALANCE: 'https://api.getwallets.co/v1/wallets/',
  FUND_WALLET: 'https://api.getwallets.co/v1/wallets/funds/manual',
  DEBIT_WALLET: 'https://api.getwallets.co/v1/wallets/debit/manual'  
});

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer ' + process.env.WALLET_KEY
};

/**
 * 
 * @param {String} email Cutomer email
 * @returns {String} Wallet ID
 */
export const createWallet = async (email) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: endpoints.CREATE_WALLET,
      data: {
        email,
      }
    });

    console.log(data);
    if (!data.success) {
      throw new Error('Could not create wallet');
    }

    return data.data[0].wallet_id;
  } catch (error) {
    return error.message;
  }
};

/**
 * 
 * @param {String} walletId Customer wallet ID
 * @returns {Number} Customer wallet balance
 */
export const getWalletBalance = async (walletId) => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: endpoints.GET_BALANCE + walletId,
    });

    console.log(data);
    if (!data.success) {
      throw new Error('Could not get wallet balance');
    }

    return data.data.balance;
  } catch (error) {
    return error.message;
  }
};

/**
 * 
 * @param {Number} amount Amount in integer
 * @param {String} walletId Customer wallet ID
 * @returns {Boolean} Operation Status
 */
export const fundWallet = async (amount, walletId) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: endpoints.FUND_WALLET,
      data: {
        walletId,
        amount
      } 
    });

    console.log(data);
    if (!data.success) {
      throw new Error('Could not fund wallet');
    }

    return data.data.success;
  } catch (error) {
    return error.message;
  }
};

/**
 * 
 * @param {Number} amount Amount in integer
 * @param {String} walletId Customer wallet ID
 * @returns {Boolean} Operation Status
 */
export const debitWallet = async (amount, walletId) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: endpoints.DEBIT_WALLET,
      data: {
        walletId,
        amount
      } 
    });

    console.log(data);
    if (!data.success) {
      throw new Error('Could not fund wallet');
    }

    return data.data.success;
  } catch (error) {
    return error.message;
  }
};

