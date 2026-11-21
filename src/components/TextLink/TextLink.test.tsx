import { render, screen } from '@testing-library/react';

import { COLORS } from '~/shared/const/colors';

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

    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('external を付けると、新しいタブで開くことを、読み上げソフトに伝える', () => {
    render(
      <TextLink external href="https://example.com">
        外部のサイト
      </TextLink>,
    );

    // 画面に見える文字のあとに、読み上げ用の文字が続く（あいだの空白の有無は、問わない）
    expect(
      screen.getByRole('link', { name: /^外部のサイト\s*（新しいタブで開きます）$/ }),
    ).toBeInTheDocument();
  });

  it('主となる色で、下線つきで表示する', () => {
    render(<TextLink href="/about">このサイトについて</TextLink>);

    expect(screen.getByRole('link')).toHaveStyleRule('color', COLORS.PRIMARY);
    expect(screen.getByRole('link')).toHaveStyleRule('text-decoration', 'underline');
  });
});
