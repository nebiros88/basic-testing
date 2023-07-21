// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

const mockObj = {
  callback: () => ({}),
};
const callbackMock: () => void = () => ({});

const fileName = 'file.txt';
const fileContent = 'Node.js';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const timeout = 500;

  test('should set timeout with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callbackMock, timeout);
    expect(spy).toHaveBeenCalledWith(callbackMock, timeout);
  });

  test('should call callback only after timeout', () => {
    const callbackSpy = jest.spyOn(mockObj, 'callback');
    doStuffByTimeout(mockObj.callback, timeout);
    expect(callbackSpy).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(callbackSpy).toBeCalled();
    expect(callbackSpy).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const interval = 500;

  test('should set interval with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callbackMock, interval);
    expect(spy).toHaveBeenCalledWith(callbackMock, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callbackSpy: jest.SpyInstance<object, string[]> = jest.spyOn(
      mockObj,
      'callback',
    );
    doStuffByTimeout(mockObj.callback, interval);

    expect(callbackSpy).not.toBeCalled();

    jest.advanceTimersByTime(interval);
    expect(callbackSpy).toBeCalled();
    expect(callbackSpy).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval);
    expect(callbackSpy).toBeCalled();
    expect(callbackSpy).toHaveBeenCalledTimes(1);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = fileName;
    const spyJoin: jest.SpyInstance<string, string[]> = jest.spyOn(
      path,
      'join',
    );
    await readFileAsynchronously(pathToFile);
    expect(spyJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(fileName);
    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(fileContent);
    const result = await readFileAsynchronously(fileName);
    expect(result).toBe(fileContent);
  });
});
