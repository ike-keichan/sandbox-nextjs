import { CheckboxRoot, Input } from './Checkbox.styled';

import type { CheckboxProps } from './Checkbox.types';

/**
 * チェックボックス
 *
 * 文字の部分を押しても、チェックを切り替えられる（全体を label で囲んでいる）。
 */
export const Checkbox = ({ label, className, ...rest }: CheckboxProps) => (
  <CheckboxRoot className={className}>
    <Input {...rest} type="checkbox" />
    {label}
  </CheckboxRoot>
);
