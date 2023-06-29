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
    expect.assertions(1);
    try {
      throwError(msg);
    } catch (error: any) {
      expect(error.message).toBe(msg);
    }
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMsg = 'Oops!';
    expect.assertions(1);
    try {
      throwError();
    } catch (error: any) {
      expect(error.message).toBe(defaultMsg);
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect.assertions(1);
    try {
      throwCustomError();
    } catch (error) {
      expect(error).toBeInstanceOf(MyAwesomeError);
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const customError = new MyAwesomeError();
    expect.assertions(1);
    try {
      await rejectCustomError();
    } catch (error) {
      expect(error).toEqual(customError);
    }
  });
});
