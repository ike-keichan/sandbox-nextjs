import { classNames } from '~/shared/utils/classNames';

import type { CheckboxProps } from './Checkbox.types';

/**
 * チェックボックス
 *
 * 文字の部分を押しても、チェックを切り替えられる（全体を label で囲んでいる）。
 */
export const Checkbox = ({ label, className, ...rest }: CheckboxProps) => (
  <label
    className={classNames(
      'inline-flex min-h-11 cursor-pointer items-center gap-2 has-disabled:cursor-not-allowed has-disabled:opacity-50',
      className,
    )}
  >
    <input
      {...rest}
      className="size-5 cursor-[inherit] accent-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      type="checkbox"
    />
    {label}
  </label>
);
