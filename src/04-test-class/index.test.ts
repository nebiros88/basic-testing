// Uncomment the code below and write your tests
import 'lodash';
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
} from './index';

describe('BankAccount', () => {
  const initBalance = 100;
  const amountMoreThanInitBalance = 120;
  const amountLessThanInitBalance = 80;
  const amountForDeposit = 50;
  let account: BankAccount;

  // jest.mock('lodash/random', () => jest.fn(() => 10));

  jest.mock('lodash', () => {
    const module = jest.requireActual('lodash');
    module.random = jest.fn(() => 10);
    return module;
  });

  beforeEach(() => {
    account = getBankAccount(initBalance);
    jest.clearAllMocks();
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    try {
      account.withdraw(amountMoreThanInitBalance);
    } catch (error) {
      expect(error).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring more than balance', () => {
    const accoutToTransfer: BankAccount = new BankAccount(initBalance);
    try {
      account.transfer(amountMoreThanInitBalance, accoutToTransfer);
    } catch (error) {
      expect(error).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring to the same account', () => {
    try {
      account.transfer(amountLessThanInitBalance, account);
    } catch (error) {
      expect(error).toBeInstanceOf(TransferFailedError);
    }
  });

  test('should deposit money', () => {
    account.deposit(amountForDeposit);
    expect(account.getBalance()).toBe(initBalance + amountForDeposit);
  });

  test('should withdraw money', () => {
    account.withdraw(amountLessThanInitBalance);
    expect(account.getBalance()).toBe(initBalance - amountLessThanInitBalance);
  });

  test('should transfer money', () => {
    const accoutToTransfer: BankAccount = new BankAccount(initBalance);
    account.transfer(amountLessThanInitBalance, accoutToTransfer);
    expect(accoutToTransfer.getBalance()).toBe(
      initBalance + amountLessThanInitBalance,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchResult = await account.fetchBalance();
    console.log('TYPEOF', typeof fetchResult);
    expect(fetchResult).toBeInstanceOf(Number);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
