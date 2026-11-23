import { VisuallyHidden } from '~/components/VisuallyHidden';
import { classNames } from '~/shared/utils/classNames';

import type { AlertProps, AlertVariant } from './Alert.types';

// 種類を表す記号、読み上げ用の言葉、スタイル
const VARIANTS = {
  info: {
    mark: 'i',
    label: 'お知らせ：',
    rootClassName: classNames('border-primary bg-primary-surface'),
    markClassName: classNames('text-primary'),
  },
  success: {
    mark: '✓',
    label: '成功：',
    rootClassName: classNames('border-success bg-success-surface'),
    markClassName: classNames('text-success'),
  },
  error: {
    mark: '!',
    label: 'エラー：',
    rootClassName: classNames('border-error bg-error-surface'),
    markClassName: classNames('text-error'),
  },
} as const satisfies Record<
  AlertVariant,
  { mark: string; label: string; rootClassName: string; markClassName: string }
>;

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
  const { mark, label, rootClassName, markClassName } = VARIANTS[variant];
  const liveRole = variant === 'error' ? 'alert' : 'status';

  return (
    <div
      {...rest}
      className={classNames(
        'flex items-start gap-2 rounded-sm border-l-4 px-4 py-3 text-foreground',
        rootClassName,
        className,
      )}
      role={live ? liveRole : undefined}
    >
      {/* 記号は見た目のためのもの。読み上げソフトには、言葉で伝える */}
      <span aria-hidden="true" className={classNames('font-bold', markClassName)}>
        {mark}
      </span>
      <div className="grid gap-0.5">
        <VisuallyHidden>{label}</VisuallyHidden>
        {title ? <p className="font-semibold">{title}</p> : null}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
};
