// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'value';
    const result = await resolveValue(value);
    expect(result).toBe('value');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = 'mockedMsg';
    expect(() => throwError(msg)).toThrow(msg);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMsg = 'Oops!';
    expect(() => throwError()).toThrow(defaultMsg);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const error = new MyAwesomeError();
    expect(() => throwCustomError()).toThrow(error);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const customError = new MyAwesomeError();
    expect.assertions(1);
    await rejectCustomError().catch((error) =>
      expect(error).toEqual(customError),
    );
  });
});
