// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 1, action: Action.Subtract, expected: 0 },
  { a: -2, b: -2, action: Action.Subtract, expected: 0 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: -2, b: 2, action: Action.Divide, expected: -1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: -1, b: 2, action: Action.Multiply, expected: -2 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 1, b: 2, action: 'bla', expected: null },
  { a: 'bla', b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $a$action$b to be $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
