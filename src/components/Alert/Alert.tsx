import { classNames } from '~/shared/utils/classNames';

import type { AlertProps, AlertVariant } from './Alert.types';

// 種類ごとのスタイル
const variantClassNames = {
  info: 'border-primary bg-primary-surface',
  success: 'border-success bg-success-surface',
  error: 'border-error bg-error-surface',
} as const satisfies Record<AlertVariant, string>;

/**
お知らせ

エラー（error）は、表示された時点で、読み上げソフトがすぐに読み上げる（role="alert"）。
それ以外は、いまの読み上げが終わってから読み上げる（role="status"）。
*/
export const Alert = ({ variant = 'info', title, children }: AlertProps) => (
  <div
    className={classNames(
      'rounded-sm border-l-4 px-4 py-3 text-foreground',
      variantClassNames[variant],
    )}
    role={variant === 'error' ? 'alert' : 'status'}
  >
    {title ? <p className="font-semibold">{title}</p> : null}
    <div className="text-sm">{children}</div>
  </div>
);
