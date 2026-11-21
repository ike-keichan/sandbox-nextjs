import type { ComponentPropsWithoutRef } from 'react';

/**
TextField コンポーネントの Props の型

input 要素に渡せる属性（value、onChange、required など）は、そのまま渡せる。
*/
export type TextFieldProps = Omit<ComponentPropsWithoutRef<'input'>, 'id'> & {
  /**
  入力欄の名前。入力欄の上に表示する
  */
  label: string;
  /**
  入力の助けになる説明。入力欄の下に表示する
  */
  description?: string;
  /**
  エラーの内容。指定すると、入力欄がエラーの表示になる
  */
  errorMessage?: string;
};
