import type { ReactNode } from 'react';

/**
お知らせの種類
*/
export type AlertVariant = 'info' | 'success' | 'error';

/**
Alert コンポーネントの Props の型
*/
export type AlertProps = {
  /**
  お知らせの種類。指定しなければ、info になる
  */
  variant?: AlertVariant;
  /**
  見出し
  */
  title?: string;
  /**
  お知らせの内容
  */
  children: ReactNode;
};
