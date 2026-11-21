import { composeStories } from '@storybook/react';
import { getByRole, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';

import { JEST_STYLED_ACTION_OPTIONS } from '~/shared/const/test';
import * as stories from './Button.stories';

const { Primary, Secondary } = composeStories(stories);
const { ACTIVE, DISABLED, FOCUS, HOVER } = JEST_STYLED_ACTION_OPTIONS;

describe('Buttonコンポーネントのテスト', () => {
  it('正常：指定した文字列が表示される', () => {
    const { container } = render(<Primary />);
    const buttonElement = getByRole(container, 'button');
    expect(buttonElement).toHaveTextContent('ボタンテキスト');
  });

  it('正常：ボタン動作が行える', async () => {
    const { container } = render(<Primary />);
    await Primary.play!({ canvasElement: container });
  });

  describe('コンポーネントパターンに応じて色のスタイルが切り替わる', () => {
    it('Primary', () => {
      const { container } = render(<Primary />);
      const buttonElement = getByRole(container, 'button');
      expect(buttonElement).toHaveStyleRule('color', '');
      expect(buttonElement).toHaveStyleRule('background-color', '');
    });
    it('Secondary', () => {
      const { container } = render(<Secondary />);
      const buttonElement = getByRole(container, 'button');
      expect(buttonElement).toHaveStyleRule('color', '');
      expect(buttonElement).toHaveStyleRule('background-color', '');
    });
  });

  describe('コンポーネントの状態に応じて色のスタイルが切り替わる', () => {
    it('正常：通常時', () => {
      const { container } = render(<Primary />);
      const buttonElement = getByRole(container, 'button');
      expect(buttonElement).toHaveStyleRule(`color`, '');
    });
    it('正常：アクティブ時（タップ時）', () => {
      const { container } = render(<Primary />);
      const buttonElement = getByRole(container, 'button');
      expect(buttonElement).toHaveStyleRule(`color`, '', ACTIVE);
    });
    it('正常：フォーカス時', () => {
      const { container } = render(<Primary />);
      const buttonElement = getByRole(container, 'button');
      expect(buttonElement).toHaveStyleRule(`color`, '', FOCUS);
    });
    it('正常：ホバー時', () => {
      const { container } = render(<Primary />);
      const buttonElement = getByRole(container, 'button');
      expect(buttonElement).toHaveStyleRule(`color`, '', HOVER);
    });
    it('正常：非活性時', () => {
      const { container } = render(<Primary />);
      const buttonElement = getByRole(container, 'button');
      expect(buttonElement).toHaveStyleRule(`color`, '', DISABLED);
    });
  });
});
