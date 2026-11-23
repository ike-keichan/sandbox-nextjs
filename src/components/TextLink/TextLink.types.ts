import type { ComponentProps } from 'react';

/**
 * TextLink コンポーネントの Props の型
 */
export type TextLinkProps = Omit<ComponentProps<'a'>, 'href' | 'target' | 'rel'> & {
  /** リンク先 */
  href: string;
  /**
   * true にすると、新しいタブで開く。
   * 外部のサイトと、ページではないもの（API、ファイルなど）へのリンクに使う。
   */
  external?: boolean;
};
