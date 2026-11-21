import { JestStyledActionOptions } from '~/shared/types/test';

/**
 * コンポーネント単体テストでアクション中の要素であることを示すオプションを管理するオブジェクト
 * jest-styled-componentsのマッチャーであるtoHaveStyleRule関数の第3引数に指定する。
 * @example
 *
 * const { DISABLED } = JEST_STYLED_ACTION_OPTION
 * expect(buttonElement).toHaveStyleRule("color", COLOR_FFFFFF, DISABLED)
 */
export const JEST_STYLED_ACTION_OPTIONS = {
  ACTIVE: {
    modifier: ':active',
  },
  CHECKED: {
    modifier: ':checked',
  },
  DISABLED: {
    modifier: ':disabled',
  },
  FOCUS: {
    modifier: ':focus',
  },
  FOCUS_VISIBLE: {
    modifier: ':focus-visible',
  },
  HOVER: {
    modifier: ':hover',
  },
} as const satisfies JestStyledActionOptions;
