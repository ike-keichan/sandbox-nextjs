import type { ComponentPropsWithoutRef } from 'react';

/**
ボタンの見た目の種類
*/
export type ButtonVariant = 'primary' | 'secondary';

/**
Button コンポーネントの Props の型

button 要素に渡せる属性（onClick、disabled など）は、そのまま渡せる。
*/
export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  /**
  見た目の種類。指定しなければ、primary になる
  */
  variant?: ButtonVariant;
};
