import { composeStories } from '@storybook/react';
import { getByRole, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-styled-components';

import { JEST_STYLED_ACTION_OPTIONS } from '~/shared/const/test';
import * as stories from './TextLink.stories';

const { Base, Disabled } = composeStories(stories);
const { ACTIVE, FOCUS, HOVER } = JEST_STYLED_ACTION_OPTIONS;

describe('TextLinkコンポーネントのテスト', () => {
  it('正常：指定した文字列が表示される', () => {
    const { container } = render(<Base />);
    const linkElement = getByRole(container, 'link');
    expect(linkElement).toHaveTextContent('リンクテキスト');
  });

  it('正常：リンク動作が行える', async () => {
    const { container } = render(<Base />);
    await Base.play!({ canvasElement: container });
  });

  describe('コンポーネントの状態に応じて色のスタイルが切り替わる', () => {
    it('正常：通常時', () => {
      const { container } = render(<Base />);
      const linkElement = getByRole(container, 'link');
      expect(linkElement).toHaveStyleRule(`color`, '');
    });
    it('正常：アクティブ時（タップ時）', () => {
      const { container } = render(<Base />);
      const linkElement = getByRole(container, 'link');
      expect(linkElement).toHaveStyleRule(`color`, '', ACTIVE);
    });
    it('正常：フォーカス時', () => {
      const { container } = render(<Base />);
      const linkElement = getByRole(container, 'link');
      expect(linkElement).toHaveStyleRule(`color`, '', FOCUS);
    });
    it('正常：ホバー時', () => {
      const { container } = render(<Base />);
      const linkElement = getByRole(container, 'link');
      expect(linkElement).toHaveStyleRule(`color`, '', HOVER);
    });
    it('正常：非活性時', () => {
      const { container } = render(<Disabled />);
      const linkElement = getByRole(container, 'link');
      expect(linkElement).toHaveStyleRule(`color`, '');
    });
  });
});
