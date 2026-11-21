import { describe, expect, it } from 'vitest';

import { classNames } from './classNames';

describe('classNames', () => {
  it('クラスの名前を、空白でつなげる', () => {
    expect(classNames('root', 'primary')).toBe('root primary');
  });

  it('undefined、null、false、空の文字列は、取り除く', () => {
    expect(classNames('root', undefined, null, false, '', 'primary')).toBe('root primary');
  });

  it('何も渡さなければ、空の文字列を返す', () => {
    expect(classNames()).toBe('');
  });
});
