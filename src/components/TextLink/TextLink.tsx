import Link from 'next/link';

import { classNames } from '~/shared/utils/classNames';

import type { TextLinkProps } from './TextLink.types';

const baseClassName =
  'rounded-xs text-primary underline underline-offset-2 hover:text-primary-hover hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

/**
文字のリンク

サイトの中のページへは、ページ全体を読み込み直さずに移動する（next/link を使っている）。
external を付けると、新しいタブで開き、そのことを読み上げソフトにも伝える。
*/
export const TextLink = ({ external = false, children, className, ...rest }: TextLinkProps) =>
  external ? (
    <Link
      {...rest}
      className={classNames(baseClassName, className)}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
      {/* sr-only: 画面には表示せず、読み上げソフトにだけ伝える */}
      <span className="sr-only">（新しいタブで開きます）</span>
    </Link>
  ) : (
    <Link {...rest} className={classNames(baseClassName, className)}>
      {children}
    </Link>
  );
