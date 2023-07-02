// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');
  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const RELATIVE_PATH = 'test';
  const AXIOS_CONFIG = { baseURL: 'https://jsonplaceholder.typicode.com' };
  const axiosMock = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    axiosMock.create = jest.fn(() => axiosMock);
    axiosMock.get.mockImplementationOnce(() =>
      Promise.resolve({ data: RELATIVE_PATH }),
    );
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(RELATIVE_PATH);
    expect(axiosMock.create).toHaveBeenLastCalledWith(AXIOS_CONFIG);
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(RELATIVE_PATH);
    expect(axiosMock.get).toHaveBeenCalledWith(RELATIVE_PATH);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(RELATIVE_PATH);
    expect(result).toEqual(RELATIVE_PATH);
  });
});
