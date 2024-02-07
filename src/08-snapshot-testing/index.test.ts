import { generateLinkedList } from './index';

type LinkedListNode<T> = {
  value: T | null;
  next: LinkedListNode<T> | null;
};

let expected: LinkedListNode<string>;

describe('generateLinkedList', () => {
  beforeAll(() => {
    expected = {
      value: 'a',
      next: {
        value: 'b',
        next: {
          value: 'c',
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
  });

  test('should generate linked list from values 1', () => {
    const values: string[] = ['a', 'b', 'c'];
    const linkedList: LinkedListNode<string> = generateLinkedList(values);
    expect(linkedList).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values: number[] = [1, 2, 3];
    const linkedList: LinkedListNode<number> = generateLinkedList(values);
    expect(linkedList).toMatchSnapshot();
  });
});