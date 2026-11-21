import { TextLinkRoot, VisuallyHidden } from './TextLink.styled';

import type { TextLinkProps } from './TextLink.types';

/**
文字のリンク

サイトの中のページへは、ページ全体を読み込み直さずに移動する（next/link を使っている）。
external を付けると、新しいタブで開き、そのことを読み上げソフトにも伝える。
*/
export const TextLink = ({ external = false, children, ...rest }: TextLinkProps) =>
  external ? (
    <TextLinkRoot {...rest} rel="noopener noreferrer" target="_blank">
      {children}
      <VisuallyHidden>（新しいタブで開きます）</VisuallyHidden>
    </TextLinkRoot>
  ) : (
    <TextLinkRoot {...rest}>{children}</TextLinkRoot>
  );
