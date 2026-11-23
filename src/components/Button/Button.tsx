import { classNames } from '~/shared/utils/classNames';

import type { ButtonProps, ButtonVariant } from './Button.types';

// クラスの並びは、classNames に渡した文字列だけ、整形の道具が並べ直す。
// そのため、定数に入れるクラスも、classNames を通して書く。

// どの種類にも共通のスタイル
const baseClassName = classNames(
  'inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg border px-4 py-2 text-base leading-normal font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50',
);

// 種類ごとのスタイル
const variantClassNames = {
  primary: classNames(
    'border-primary bg-primary text-on-primary enabled:hover:border-primary-hover enabled:hover:bg-primary-hover',
  ),
  secondary: classNames(
    'border-primary bg-background text-primary enabled:hover:bg-primary-surface',
  ),
} as const satisfies Record<ButtonVariant, string>;

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
  <button
    className={classNames(baseClassName, variantClassNames[variant], className)}
    type={type}
    {...rest}
  />
);
