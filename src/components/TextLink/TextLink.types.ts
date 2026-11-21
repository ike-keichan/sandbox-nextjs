import type { ComponentPropsWithoutRef } from 'react';

/**
TextLink コンポーネントの Props の型
*/
export type TextLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'target' | 'rel'> & {
  /**
  リンク先
  */
  href: string;
  /**
  true にすると、新しいタブで開く。外部のサイトへのリンクに使う
  */
  external?: boolean;
};
