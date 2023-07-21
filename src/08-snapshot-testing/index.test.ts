import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const generatedList = generateLinkedList(['a', 'b']);
    expect(generatedList).toStrictEqual({
      next: {
        next: {
          next: null,
          value: null,
        },
        value: 'b',
      },
      value: 'a',
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const generatedList = generateLinkedList(['a', 'b']);
    expect(generatedList).toMatchSnapshot();
  });
});
