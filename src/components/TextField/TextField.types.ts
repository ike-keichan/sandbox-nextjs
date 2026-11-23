import type { ComponentProps } from 'react';

/**
 * TextField コンポーネントの Props の型
 *
 * input 要素に渡せる属性（value、onChange、required、ref など）は、そのまま渡せる。
 * className は、いちばん外側の要素に付く。
 * aria-invalid は、errorMessage から決まるので、渡せない。
 */
export type TextFieldProps = Omit<ComponentProps<'input'>, 'id' | 'aria-invalid'> & {
  /**
  入力欄の名前。入力欄の上に表示する
  */
  label: string;
  /**
  入力の助けになる説明。入力欄の下に表示する
  */
  description?: string;
  /**
  エラーの内容。指定すると、入力欄がエラーの表示になる。空の文字列は、指定なしと同じ
  */
  errorMessage?: string;
};
