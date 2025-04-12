import postcss from 'postcss';
import { describe, it, expect } from 'vitest';
import plugin from '../index.js';
import { readFileSync } from 'node:fs';

describe('postcss-input-style', () => {
  /**
   *
   * @param {string} fixture
   */
  const test = function (fixture) {
    const input = readFileSync('./test/fixtures/' + fixture + '.css', 'utf8');
    const expected = readFileSync('./test/fixtures/' + fixture + '.expected.css', 'utf8');

    const result = postcss([plugin()]).process(input);

    expect(result.css).toBe(expected);
    expect(result.warnings()).to.be.empty;
  };

  it('creates range track selectors', () => test('range-track'));

  it('creates range thumb selectors', () => test('range-thumb'));

  it('takes root-level pseudo selectors', () => test('root'));

  it('handles grouped mixed selectors', () => test('mixed'));
});
