import { classNames } from '~/shared/utils/classNames';

import styles from './Checkbox.module.css';

import type { CheckboxProps } from './Checkbox.types';

/**
 * チェックボックス
 *
 * 文字の部分を押しても、チェックを切り替えられる（全体を label で囲んでいる）。
 */
export const Checkbox = ({ label, className, ...rest }: CheckboxProps) => (
  <label className={classNames(styles.root, className)}>
    <input {...rest} className={styles.input} type="checkbox" />
    {label}
  </label>
);
