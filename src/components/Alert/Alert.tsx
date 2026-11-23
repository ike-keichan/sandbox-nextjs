import { VisuallyHidden } from '~/components/VisuallyHidden';
import { classNames } from '~/shared/utils/classNames';

import styles from './Alert.module.css';

import type { AlertProps, AlertVariant } from './Alert.types';

// 種類を表す記号と、読み上げ用の言葉
const VARIANTS = {
  info: { mark: 'i', label: 'お知らせ：' },
  success: { mark: '✓', label: '成功：' },
  error: { mark: '!', label: 'エラー：' },
} as const satisfies Record<AlertVariant, { mark: string; label: string }>;

/**
 * お知らせ
 *
 * 種類は、色だけでなく、記号と、読み上げ用の言葉でも伝える。
 *
 * エラー（error）は、表示された時点で、読み上げソフトがすぐに読み上げる（role="alert"）。
 * それ以外は、いまの読み上げが終わってから読み上げる（role="status"）。
 *
 * role="status" は、あとから画面に足した場合、読み上げソフトによっては、読み上げられない。
 * 確実に読み上げさせたいときは、使う側で、空の領域（role="status" を付けた要素）を先に置いておき、
 * その中に、live を false にした Alert を出し入れする。
 */
export const Alert = ({
  variant = 'info',
  title,
  live = true,
  className,
  children,
  ...rest
}: AlertProps) => {
  const liveRole = variant === 'error' ? 'alert' : 'status';

  return (
    <div
      {...rest}
      className={classNames(styles.root, styles[variant], className)}
      role={live ? liveRole : undefined}
    >
      <span aria-hidden="true" className={styles.mark}>
        {VARIANTS[variant].mark}
      </span>
      <div className={styles.content}>
        <VisuallyHidden>{VARIANTS[variant].label}</VisuallyHidden>
        {title ? <p className={styles.title}>{title}</p> : null}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};
