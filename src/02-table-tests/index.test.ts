import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 10, b: 20, action: Action.Add, expected: 30 },
    { a: 0, b: -20, action: Action.Add, expected: -20 },
    { a: 0.1, b: 0.2, action: Action.Add, expected: 0.3 },
    { a: 30, b: 10, action: Action.Subtract, expected: 20 },
    { a: 10, b: -20, action: Action.Subtract, expected: 30 },
    { a: -10, b: 20, action: Action.Subtract, expected: -30 },
    { a: 30, b: 10, action: Action.Multiply, expected: 300 },
    { a: 10, b: -20, action: Action.Multiply, expected: -200 },
    { a: 10, b: 0, action: Action.Multiply, expected: 0 },
    { a: 30, b: 10, action: Action.Divide, expected: 3 },
    { a: 30, b: -10, action: Action.Divide, expected: -3 },
    { a: 10, b: 0, action: Action.Divide, expected: Infinity },
    { a: 0, b: 10, action: Action.Divide, expected: 0 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 3, b: 1, action: Action.Exponentiate, expected: 3 },
    { a: 4, b: 0, action: Action.Exponentiate, expected: 1 },
    { a: 0, b: 4, action: Action.Exponentiate, expected: 0 },
    { a: 100, b: -2, action: Action.Exponentiate, expected: 0.0001 },
    { a: 2, b: 3, action: '%', expected: null },
    { a: 3, b: 1, action: '=', expected: null },
    { a: 'string', b: 1, action: Action.Add, expected: null },
    { a: 2, b: true, action: Action.Add, expected: null },
    { a: null, b: 3, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
      'pattern1: simpleCalculator($a, $b, $action) = $expected',
      ({ a, b, action, expected }) => {
        expected === null
            ? expect(simpleCalculator({ a, b, action })).toBeNull()
            : Number.isInteger(expected)
                ? expect(simpleCalculator({ a, b, action })).toBe(expected)
                : expect(simpleCalculator({ a, b, action })).toBeCloseTo(expected);
      }
  );
});