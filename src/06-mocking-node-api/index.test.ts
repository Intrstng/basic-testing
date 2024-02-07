import path from 'path';
import fs from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';


let delay: number;
let callBack: () => void

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    delay = 1000;
    callBack = jest.fn();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    // or // const timer = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callBack, delay);
    expect(setTimeout).toHaveBeenCalledWith(callBack, delay);
    // or // expect(timer).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callBack, delay);
    expect(callBack).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callBack).toHaveBeenCalled();
    expect(callBack).toHaveBeenCalledTimes(1);
  });
});


describe('doStuffByInterval', () => {
  beforeEach(() => {
    delay = 1000;
    callBack = jest.fn();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    // or // const timer = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callBack, delay);
    expect(setInterval).toHaveBeenCalledWith(callBack, delay);
   // or // expect(timer).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callBack, delay);
    expect(callBack).not.toHaveBeenCalled();

    jest.advanceTimersByTime(delay + 500);
    expect(callBack).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(delay + 2000);
    expect(callBack).toHaveBeenCalledTimes(4);
  });
});


describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'some-file.txt';
    const joinedMock = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(joinedMock).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const wrongPathToFile = 'some-wrong-file.txt';
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(wrongPathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'some-file.txt';
    const fileInnerText = 'This is the internal content of the file';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fileInnerText);
    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(fileInnerText);
  });
});