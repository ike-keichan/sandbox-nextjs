import type { ComponentProps } from 'react';

/**
 * お知らせの種類
 */
export type AlertVariant = 'info' | 'success' | 'error';

/**
 * Alert コンポーネントの Props の型
 *
 * div 要素に渡せる属性（id、className など）は、そのまま渡せる。
 * role は、種類と live から決まるので、渡せない。
 */
export type AlertProps = Omit<ComponentProps<'div'>, 'title' | 'role'> & {
  /** お知らせの種類。指定しなければ、info になる */
  variant?: AlertVariant;
  /** 見出し */
  title?: string;
  /**
   * 表示されたときに、読み上げソフトに読み上げさせるかどうか。指定しなければ、true になる。
   * ページを開いたときから表示している案内や、読み上げの領域（role="status"）の中に置くときは、false にする。
   */
  live?: boolean;
};
