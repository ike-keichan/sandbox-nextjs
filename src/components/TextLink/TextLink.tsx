import { VisuallyHidden } from '~/components/VisuallyHidden';

import { ExternalLink, ExternalMark, InternalLink } from './TextLink.styled';

import type { TextLinkProps } from './TextLink.types';

/**
 * 文字のリンク
 *
 * サイトの中のページへは、ページ全体を読み込み直さずに移動する（next/link を使う）。
 *
 * external を付けると、ふつうの a 要素になり、新しいタブで開く。
 * next/link は、リンク先のページを、先回りして読み込む。ページではないもの（API など）に使うと、
 * 表示しただけで、リンク先が呼ばれてしまう。そのため、ページ以外へのリンクには、external を付ける。
 */
export const TextLink = ({ external = false, children, ...rest }: TextLinkProps) =>
  external ? (
    <ExternalLink {...rest} rel="noopener noreferrer" target="_blank">
      {children}
      {/* 記号は見た目のためのもの。読み上げソフトには、言葉で伝える */}
      <ExternalMark aria-hidden="true">↗</ExternalMark>
      <VisuallyHidden>（新しいタブで開きます）</VisuallyHidden>
    </ExternalLink>
  ) : (
    <InternalLink {...rest}>{children}</InternalLink>
  );
