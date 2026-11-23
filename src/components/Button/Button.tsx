import { ButtonRoot } from './Button.styled';

import type { ButtonProps } from './Button.types';

/**
 * ボタン
 *
 * type を指定しなければ、button になる（フォームの中に置いても、勝手に送信しない）。
 */
export const Button = ({ variant = 'primary', type = 'button', ...rest }: ButtonProps) => (
  <ButtonRoot $variant={variant} type={type} {...rest} />
);
