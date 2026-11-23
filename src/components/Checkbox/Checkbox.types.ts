import type { ComponentProps, ReactNode } from 'react';

/**
 * Checkbox コンポーネントの Props の型
 *
 * input 要素に渡せる属性（checked、onChange、disabled、ref など）は、そのまま渡せる。
 * className は、いちばん外側の要素に付く。
 */
export type CheckboxProps = Omit<ComponentProps<'input'>, 'type' | 'children'> & {
  /**
  チェックボックスの横に表示する内容。文字のほか、リンクなども渡せる
  */
  label: ReactNode;
};
