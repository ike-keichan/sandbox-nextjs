import { classNames } from '~/shared/utils/classNames';

import styles from './Button.module.css';

import type { ButtonProps } from './Button.types';

/**
 * ボタン
 *
 * type を指定しなければ、button になる（フォームの中に置いても、勝手に送信しない）。
 */
export const Button = ({
  variant = 'primary',
  type = 'button',
  className,
  ...rest
}: ButtonProps) => (
  <button className={classNames(styles.root, styles[variant], className)} type={type} {...rest} />
);
