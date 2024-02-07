// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

// jest.mock('./index', () => {
//   // const originalModule = jest.requireActual<typeof import('./index')>('./index');
// });


// jest.mock('./index', () => ({
// __esModule: true,
//   ...jest.requireActual<typeof import('./index')>('./index'),
//   mockOne: jest.fn(),
//   mockTwo: jest.fn(),
//   mockThree: jest.fn()
// }));


jest.mock('./index', () => {
  return {
    __esModule: true,
    ...jest.requireActual<typeof import('./index')>('./index'),
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const mockSpy = jest.spyOn(console, 'log').mockImplementation();
    mockOne();
    mockTwo();
    mockThree();
    expect(mockSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
    const unmockedFunctionSpy = jest.spyOn(console, 'log').mockImplementation();
    unmockedFunction();
    expect(unmockedFunctionSpy).toHaveBeenCalled();
  });

  afterAll(() => {
    jest.unmock('./index');
    jest.restoreAllMocks();
  });
});
