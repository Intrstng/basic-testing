import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';


jest.mock('./index', () => ({
    __esModule: true,
    ...jest.requireActual<typeof import('./index')>('./index'),
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  }));

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
    jest.restoreAllMocks();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const mockSpy = jest.spyOn(console, 'log').mockImplementation();
    mockOne();
    mockTwo();
    mockThree();
    expect(mockSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const unmockedFunctionSpy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(unmockedFunctionSpy).toHaveBeenCalled();
  });
});