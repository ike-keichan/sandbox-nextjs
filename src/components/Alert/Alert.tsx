import { classNames } from '~/shared/utils/classNames';

import styles from './Alert.module.css';

import type { AlertProps } from './Alert.types';

/**
お知らせ

エラー（error）は、表示された時点で、読み上げソフトがすぐに読み上げる（role="alert"）。
それ以外は、いまの読み上げが終わってから読み上げる（role="status"）。
*/
export const Alert = ({ variant = 'info', title, children }: AlertProps) => (
  <div
    className={classNames(styles.root, styles[variant])}
    role={variant === 'error' ? 'alert' : 'status'}
  >
    {title ? <p className={styles.title}>{title}</p> : null}
    <div className={styles.body}>{children}</div>
  </div>
);
