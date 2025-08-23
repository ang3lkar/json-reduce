import { test, describe } from 'node:test';
import assert from 'node:assert';
import compact from './compact.js';

describe('compact function', () => {
  test('should handle empty objects', () => {
    const input = {};
    const expected = {};
    const result = compact(input, {stringLimit: 300, arrayLimit: 3});
    assert.deepStrictEqual(result, expected);
  });

  test('should handle simple objects with primitive values', () => {
    const input = {
      name: 'John',
      age: 30,
      active: true
    };
    const expected = {
      name: 'John',
      age: 30,
      active: true
    };
    const result = compact(input, {stringLimit: 300, arrayLimit: 3});
    assert.deepStrictEqual(result, expected);
  });

  test('should truncate long strings', () => {
    const longString = 'a'.repeat(400);
    const input = {
      description: longString
    };
    const expected = {
      description: 'a'.repeat(300) + '...'
    };
    const result = compact(input, {stringLimit: 300, arrayLimit: 3});
    assert.deepStrictEqual(result, expected);
  });

  test('should not truncate strings that already end with ...', () => {
    const longString = 'a'.repeat(400) + '...';
    const input = {
      description: longString
    };
    const expected = {
      description: longString
    };
    const result = compact(input, {stringLimit: 300, arrayLimit: 3});
    assert.deepStrictEqual(result, expected);
  });

  test('should handle empty arrays', () => {
    const input = {
      items: []
    };
    const expected = {
      items: []
    };
    const result = compact(input, {stringLimit: 300, arrayLimit: 3});
    assert.deepStrictEqual(result, expected);
  });

  test('should handle arrays with single element', () => {
    const input = {
      items: ['single']
    };
    const expected = {
      items: ['single']
    };
    const result = compact(input, {stringLimit: 300, arrayLimit: 3});
    assert.deepStrictEqual(result, expected);
  });

  test('should reduce large arrays to limit', () => {
    const input = {
      items: ['item1', 'item2', 'item3', 'item4', 'item5']
    };
    const expected = {
      items: ['item1', 'item2', 'item3', '<2 more items>']
    };
    const result = compact(input, {stringLimit: 300, arrayLimit: 3});
    assert.deepStrictEqual(result, expected);
  });

  test('should handle arrays within limit', () => {
    const input = {
      items: ['item1', 'item2', 'item3']
    };
    const expected = {
      items: ['item1', 'item2', 'item3']
    };
    const result = compact(input, {stringLimit: 300, arrayLimit: 3});
    assert.deepStrictEqual(result, expected);
  });

  test('should handle nested objects', () => {
    const input = {
      user: {
        name: 'John',
        hobbies: ['reading', 'gaming', 'cooking', 'swimming', 'running']
      }
    };
    const expected = {
      user: {
        name: 'John',
        hobbies: ['reading', 'gaming', 'cooking', '<2 more items>']
      }
    };
    const result = compact(input, {stringLimit: 300, arrayLimit: 3});
    assert.deepStrictEqual(result, expected);
  });

  test('should handle deeply nested objects', () => {
    const input = {
      level1: {
        level2: {
          level3: {
            data: ['a', 'b', 'c', 'd', 'e', 'f']
          }
        }
      }
    };
    const expected = {
      level1: {
        level2: {
          level3: {
            data: ['a', 'b', 'c', '<3 more items>']
          }
        }
      }
    };
    const result = compact(input, {stringLimit: 300, arrayLimit: 3});
    assert.deepStrictEqual(result, expected);
  });

  test('should handle arrays with existing "more items"', () => {
    const input = {
      items: ['item1', 'item2', 'item3', 'item4', '5 more items']
    };
    const expected = {
      items: ['item1', 'item2', 'item3', '<6 more items>']
    };
    const result = compact(input, {stringLimit: 300, arrayLimit: 3});
    assert.deepStrictEqual(result, expected);
  });

  test('should preserve "more items" when array is within limit', () => {
    const input = {
      items: ['item1', 'item2', '3 more items']
    };
    const expected = {
      items: ['item1', 'item2', '<3 more items>']
    };
    const result = compact(input, {stringLimit: 300, arrayLimit: 3});
    assert.deepStrictEqual(result, expected);
  });

  test('should handle mixed data types', () => {
    const input = {
      name: 'John',
      age: 30,
      tags: ['tag1', 'tag2', 'tag3', 'tag4'],
      description: 'a'.repeat(400),
      metadata: {
        created: '2023-01-01',
        tags: ['meta1', 'meta2']
      }
    };
    const expected = {
      name: 'John',
      age: 30,
      tags: ['tag1', 'tag2', 'tag3', '<1 more items>'],
      description: 'a'.repeat(300) + '...',
      metadata: {
        created: '2023-01-01',
        tags: ['meta1', 'meta2']
      }
    };
    const result = compact(input, {stringLimit: 300, arrayLimit: 3});
    assert.deepStrictEqual(result, expected);
  });

  test('should handle null and undefined values', () => {
    const input = {
      nullValue: null,
      undefinedValue: undefined,
      items: ['item1', 'item2', 'item3', 'item4']
    };
    const expected = {
      nullValue: null,
      undefinedValue: undefined,
      items: ['item1', 'item2', 'item3', '<1 more items>']
    };
    const result = compact(input, {stringLimit: 300, arrayLimit: 3});
    assert.deepStrictEqual(result, expected);
  });

  test('should handle arrays with objects', () => {
    const input = {
      users: [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
        { name: 'Bob', age: 35 },
        { name: 'Alice', age: 28 },
        { name: 'Charlie', age: 32 }
      ]
    };
    const expected = {
      users: [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
        { name: 'Bob', age: 35 },
        '<2 more items>'
      ]
    };
    const result = compact(input, {stringLimit: 300, arrayLimit: 3});
    assert.deepStrictEqual(result, expected);
  });
});
