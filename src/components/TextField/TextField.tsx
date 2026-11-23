import { useId } from 'react';

import { classNames } from '~/shared/utils/classNames';

import type { TextFieldProps } from './TextField.types';

const inputClassName = classNames(
  'min-h-11 rounded-lg border bg-background px-3 py-2 text-base leading-normal text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50',
);

/**
 * 1行の入力欄
 *
 * 名前（label）、説明、エラーの内容を、入力欄と結び付けている。
 * 読み上げソフトは、入力欄に移動したときに、これらをまとめて読み上げる。
 *
 * エラーを表示しただけでは、読み上げソフトは読み上げない。
 * 送信に失敗したときは、使う側で、入力欄にフォーカスを移す（ref を渡して、focus を呼ぶ）。
 */
export const TextField = ({
  label,
  description,
  errorMessage,
  required = false,
  className,
  'aria-describedby': ariaDescribedBy,
  ...rest
}: TextFieldProps) => {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorMessageId = `${id}-error`;
  const invalid = Boolean(errorMessage);

  // 使う側が指定した説明と、この部品の説明とエラーのうち、表示しているものを、入力欄と結び付ける
  const describedBy =
    [ariaDescribedBy, description ? descriptionId : null, invalid ? errorMessageId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <div className={classNames('grid gap-1', className)}>
      <label className="text-sm font-semibold" htmlFor={id}>
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-error">
            *
          </span>
        ) : null}
      </label>
      <input
        {...rest}
        aria-describedby={describedBy}
        aria-invalid={invalid}
        className={classNames(inputClassName, invalid ? 'border-error' : 'border-line')}
        id={id}
        required={required}
      />
      {description ? (
        <p className="text-sm text-muted" id={descriptionId}>
          {description}
        </p>
      ) : null}
      {invalid ? (
        <p className="text-sm text-error" id={errorMessageId}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};
