import Link from 'next/link';

import { VisuallyHidden } from '~/components/VisuallyHidden';
import { classNames } from '~/shared/utils/classNames';

import styles from './TextLink.module.css';

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
export const TextLink = ({ external = false, children, className, ...rest }: TextLinkProps) =>
  external ? (
    <a
      {...rest}
      className={classNames(styles.root, className)}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
      {/* 記号は見た目のためのもの。読み上げソフトには、言葉で伝える */}
      <span aria-hidden="true" className={styles.externalMark}>
        ↗
      </span>
      <VisuallyHidden>（新しいタブで開きます）</VisuallyHidden>
    </a>
  ) : (
    <Link {...rest} className={classNames(styles.root, className)}>
      {children}
    </Link>
  );
