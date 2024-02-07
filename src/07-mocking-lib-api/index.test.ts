import axios from 'axios';
import { throttledGetDataFromApi } from './index';


jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const url = { baseURL: 'https://jsonplaceholder.typicode.com' };
    const relativePath= './todos/1';
    const data = 'data';

    axios.create = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ data }),
    });

    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(axios.create).toHaveBeenCalledWith(expect.objectContaining(url));
  });


  test('should perform request to correct provided url', async () => {
    const relativePath = './todos/1';
    const responseData = 'data';

    axios.create = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: responseData }),
    });

    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(axios.create().get).toHaveBeenCalledWith(relativePath);
  });


  test('should return response data', async () => {
    const relativePath = './todos/1';
    const responseData = 'data';

    axios.create = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: responseData }),
    });

    const response = await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();

    expect(response).toBe(responseData);
  });
});
