import {getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError} from '.';
import lodash from 'lodash';

let initialBalance: number;

describe('BankAccount', () => {
  beforeEach(() => {
    initialBalance = 100;
    jest.clearAllMocks();
  })

  test('should create account with initial balance', () => {
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawAmount = 120;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(withdrawAmount)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const transferAmount = 120;
    const account_1 = getBankAccount(initialBalance);
    const account_2 = getBankAccount(initialBalance);
    expect(() => account_1.transfer(transferAmount, account_2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const transferAmount = 120000; // checking of accounts goes first in transfer method (amount doesn't matter here)
    const account_1 = getBankAccount(initialBalance);
    expect(() => account_1.transfer(transferAmount, account_1)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(initialBalance);
    account.deposit(20);
    expect(account.getBalance()).toBe(120);
    account.deposit(70);
    expect(account.getBalance()).toBe(190);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(initialBalance);
    const withdrawAmount_1 = 90;
    const withdrawAmount_2 = 9;
    account.withdraw(withdrawAmount_1);
    expect(account.getBalance()).toBe(10);
    account.withdraw(withdrawAmount_2);
    expect(account.getBalance()).toBe(1);
  });

  test('should transfer money', () => {
    const transferAmount = 60;
    const account_1 = getBankAccount(initialBalance);
    const account_2 = getBankAccount(initialBalance);
    account_1.transfer(transferAmount, account_2);
    expect(account_1.getBalance()).toBe(40);
    expect(account_2.getBalance()).toBe(160);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const newBalance = 70;
    lodash.random = jest.fn(() => 1).mockImplementationOnce(() => newBalance);
    const account = getBankAccount(initialBalance);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 70;
    lodash.random = jest.fn(() => 1).mockImplementationOnce(() => newBalance);
    const account = getBankAccount(initialBalance);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const newBalance = 70;
    lodash.random = jest.fn(() => 0).mockImplementationOnce(() => newBalance);
    const account = getBankAccount(initialBalance);
    return expect(account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });

  afterEach(() => {
    jest.unmock('lodash');
  })
});
