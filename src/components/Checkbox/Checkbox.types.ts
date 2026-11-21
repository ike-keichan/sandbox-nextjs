import type { ComponentPropsWithoutRef } from 'react';

/**
Checkbox コンポーネントの Props の型

input 要素に渡せる属性（checked、onChange、disabled など）は、そのまま渡せる。
*/
export type CheckboxProps = Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'children'> & {
  /**
  チェックボックスの横に表示する文字
  */
  label: string;
};
