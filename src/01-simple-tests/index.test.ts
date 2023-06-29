// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const rawInput = {
      a: 1,
      b: 5,
      action: Action.Add,
    };
    const result: number | null = simpleCalculator(rawInput);
    expect(result).toBe(6);
  });

  test('should subtract two numbers', () => {
    const rawInput = {
      a: 5,
      b: 1,
      action: Action.Subtract,
    };
    const result: number | null = simpleCalculator(rawInput);
    expect(result).toBe(4);
  });

  test('should multiply two numbers', () => {
    const rawInput = {
      a: 5,
      b: 5,
      action: Action.Multiply,
    };
    const result: number | null = simpleCalculator(rawInput);
    expect(result).toBe(25);
  });

  test('should divide two numbers', () => {
    const rawInput = {
      a: 36,
      b: 6,
      action: Action.Divide,
    };
    const result: number | null = simpleCalculator(rawInput);
    expect(result).toBe(6);
  });

  test('should exponentiate two numbers', () => {
    const rawInput = {
      a: 3,
      b: 3,
      action: Action.Exponentiate,
    };
    const result: number | null = simpleCalculator(rawInput);
    expect(result).toBe(27);
  });

  test('should return null for invalid action', () => {
    const rawInput = {
      a: 3,
      b: 3,
      action: 'bla',
    };
    const result: number | null = simpleCalculator(rawInput);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const rawInput = {
      a: 'bla',
      b: 'bla',
      action: Action.Divide,
    };
    const result: number | null = simpleCalculator(rawInput);
    expect(result).toBeNull();
  });
});
