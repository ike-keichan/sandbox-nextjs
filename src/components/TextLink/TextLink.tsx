import Link from 'next/link';

import { classNames } from '~/shared/utils/classNames';

import styles from './TextLink.module.css';

import type { TextLinkProps } from './TextLink.types';

/**
文字のリンク

サイトの中のページへは、ページ全体を読み込み直さずに移動する（next/link を使っている）。
external を付けると、新しいタブで開き、そのことを読み上げソフトにも伝える。
*/
export const TextLink = ({ external = false, children, className, ...rest }: TextLinkProps) =>
  external ? (
    <Link
      {...rest}
      className={classNames(styles.root, className)}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
      <span className={styles.visuallyHidden}>（新しいタブで開きます）</span>
    </Link>
  ) : (
    <Link {...rest} className={classNames(styles.root, className)}>
      {children}
    </Link>
  );
