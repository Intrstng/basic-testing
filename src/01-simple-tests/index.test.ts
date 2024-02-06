// Uncomment the code below and write your tests
import {simpleCalculator, Action} from './index';

// let dataAdd_1, dataAdd_2;
//
// beforeEach(() => {
//   const dataAdd_1 = {a: 10, b: 20, action: Action.Add};
//   const dataAdd_2 = {a: 0, b: -20, action: Action.Add};
// })

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const dataAdd_1 = { a: 10, b: 20, action: Action.Add };
    const dataAdd_2 = { a: 0, b: -20, action: Action.Add };
    const dataAdd_3 = { a: 0.1, b: 0.2, action: Action.Add };
    // action
    const result_1 = simpleCalculator(dataAdd_1);
    const result_2 = simpleCalculator(dataAdd_2);
    const result_3 = simpleCalculator(dataAdd_3);
    // expect result
    expect(result_1).toBe(30);
    expect(result_2).toBe(-20);
    expect(result_3).toBeCloseTo(0.3);
  });

  test('should subtract two numbers', () => {
    const dataSub_1 = { a: 30, b: 10, action: Action.Subtract };
    const dataSub_2 = { a: 10, b: -20, action: Action.Subtract };
    const dataSub_3 = { a: -10, b: 20, action: Action.Subtract };
    // action
    const result_1 = simpleCalculator(dataSub_1);
    const result_2 = simpleCalculator(dataSub_2);
    const result_3 = simpleCalculator(dataSub_3);
    // expect result
    expect(result_1).toBe(20);
    expect(result_2).toBe(30);
    expect(result_3).toBe(-30);
  });

  test('should multiply two numbers', () => {
    const dataMul_1 = { a: 30, b: 10, action: Action.Multiply };
    const dataMul_2 = { a: 10, b: -20, action: Action.Multiply };
    const dataMul_3 = { a: 10, b: 0, action: Action.Multiply };
    // action
    const result_1 = simpleCalculator(dataMul_1);
    const result_2 = simpleCalculator(dataMul_2);
    const result_3 = simpleCalculator(dataMul_3);
    // expect result
    expect(result_1).toBe(300);
    expect(result_2).toBe(-200);
    expect(result_3).toBe(0);
  });

  test('should divide two numbers', () => {
    const dataDevide_1 = { a: 30, b: 10, action: Action.Divide };
    const dataDevide_2 = { a: 30, b: -10, action: Action.Divide };
    const dataDevide_3 = { a: 10, b: 0, action: Action.Divide };
    const dataDevide_4 = { a: 0, b: 10, action: Action.Divide };
    // action
    const result_1 = simpleCalculator(dataDevide_1);
    const result_2 = simpleCalculator(dataDevide_2);
    const result_3 = simpleCalculator(dataDevide_3);
    const result_4 = simpleCalculator(dataDevide_4);
    // expect result
    expect(result_1).toBe(3);
    expect(result_2).toBe(-3);
    expect(result_3).toBe(Infinity);
    expect(result_4).toBe(0);
  });

  test('should exponentiate two numbers', () => {
    const dataExp_1 = { a: 2, b: 3, action: Action.Exponentiate };
    const dataExp_2 = { a: 3, b: 1, action: Action.Exponentiate };
    const dataExp_3 = { a: 4, b: 0, action: Action.Exponentiate };
    const dataExp_4 = { a: 0, b: 4, action: Action.Exponentiate };
    const dataExp_5 = { a: 100, b: -2, action: Action.Exponentiate };
    // action
    const result_1 = simpleCalculator(dataExp_1);
    const result_2 = simpleCalculator(dataExp_2);
    const result_3 = simpleCalculator(dataExp_3);
    const result_4 = simpleCalculator(dataExp_4);
    const result_5 = simpleCalculator(dataExp_5);
    // expect result
    expect(result_1).toBe(8);
    expect(result_2).toBe(3);
    expect(result_3).toBe(1);
    expect(result_4).toBe(0);
    expect(result_5).toBeCloseTo(0.0001);
  });

  test('should return null for invalid action', () => {
    const dataInvAct_1 = { a: 2, b: 3, action: '%' };
    const dataInvAct_2 = { a: 3, b: 1, action: '=' };
    // action
    const result_1 = simpleCalculator(dataInvAct_1);
    const result_2 = simpleCalculator(dataInvAct_2);
    // expect result
    expect(result_1).toBeNull();
    expect(result_2).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const dataInvArg_1 = { a: 'string', b: 1, action: Action.Add };
    const dataInvArg_2 = { a: 2, b: true, action: Action.Add };
    const dataInvArg_3 = { a: null, b: 3, action: Action.Add };
    // action
    const result_1 = simpleCalculator(dataInvArg_1);
    const result_2 = simpleCalculator(dataInvArg_2);
    const result_3 = simpleCalculator(dataInvArg_3);
    // expect result
    expect(result_1).toBeNull();
    expect(result_2).toBeNull();
    expect(result_3).toBeNull();
  });
});