/**
クラスの名前を、空白でつなげる関数

undefined や false は、取り除く。条件によって付けるクラスを、短く書ける。

@example
classNames(styles.root, invalid && styles.invalid, className)
*/
export const classNames = (...names: (string | false | null | undefined)[]): string =>
  names.filter(Boolean).join(' ');
