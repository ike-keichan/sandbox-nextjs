import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { findA11yViolations } from '~/shared/test/findA11yViolations';

import { TextLink } from './TextLink';

describe('TextLink', () => {
  it('渡した文字と、リンク先が設定される', () => {
    render(<TextLink href="/about">このサイトについて</TextLink>);

    const link = screen.getByRole('link', { name: 'このサイトについて' });

    expect(link).toHaveAttribute('href', '/about');
  });

  it('external を付けなければ、同じタブで開く', () => {
    render(<TextLink href="/about">このサイトについて</TextLink>);

    expect(screen.getByRole('link')).not.toHaveAttribute('target');
  });

  it('external を付けると、新しいタブで安全に開く', () => {
    render(
      <TextLink external href="https://example.com">
        外部のサイト
      </TextLink>,
    );

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('external を付けると、新しいタブで開くことを、読み上げソフトに伝える', () => {
    render(
      <TextLink external href="https://example.com">
        外部のサイト
      </TextLink>,
    );

    // 画面に見える文字のあとに、読み上げ用の文字が続く（記号は読み上げない。あいだの空白の有無は、問わない）
    expect(
      screen.getByRole('link', { name: /^外部のサイト\s*（新しいタブで開きます）$/ }),
    ).toBeInTheDocument();
  });

  it('キーボードの Tab で、フォーカスが当たる', async () => {
    const user = userEvent.setup();
    render(<TextLink href="/about">このサイトについて</TextLink>);

    await user.tab();

    expect(screen.getByRole('link')).toHaveFocus();
  });

  it('リンクのスタイルと、フォーカスが当たったときの枠線がある', () => {
    render(<TextLink href="/about">このサイトについて</TextLink>);

    expect(screen.getByRole('link')).toHaveClass('text-primary', 'underline');
    expect(screen.getByRole('link')).toHaveClass(
      'focus-visible:outline-2',
      'focus-visible:outline-offset-2',
      'focus-visible:outline-primary',
    );
  });

  it('渡した className も、あわせて付く', () => {
    render(
      <TextLink className="wide" href="/about">
        このサイトについて
      </TextLink>,
    );

    expect(screen.getByRole('link')).toHaveClass('wide');
  });

  it('アクセシビリティの問題がない', async () => {
    const { container } = render(
      <TextLink external href="https://example.com">
        外部のサイト
      </TextLink>,
    );

    expect(await findA11yViolations(container)).toEqual([]);
  });
});
