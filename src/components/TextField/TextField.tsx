import { useId } from 'react';

import { classNames } from '~/shared/utils/classNames';

import type { TextFieldProps } from './TextField.types';

const inputClassName =
  'min-h-11 rounded-lg border bg-background px-3 py-2 text-base leading-normal text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50';

/**
1行の入力欄

名前（label）、説明、エラーの内容を、入力欄と結び付けている。
読み上げソフトは、入力欄に移動したときに、これらをまとめて読み上げる。
*/
export const TextField = ({
  label,
  description,
  errorMessage,
  required = false,
  className,
  ...rest
}: TextFieldProps) => {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorMessageId = `${id}-error`;
  const isInvalid = errorMessage !== undefined;

  // 説明とエラーのうち、表示しているものだけを、入力欄と結び付ける
  const describedBy =
    [description ? descriptionId : null, isInvalid ? errorMessageId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <div className="grid gap-1">
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
        aria-invalid={isInvalid}
        className={classNames(
          inputClassName,
          isInvalid ? 'border-error' : 'border-line',
          className,
        )}
        id={id}
        required={required}
      />
      {description ? (
        <p className="text-sm text-muted" id={descriptionId}>
          {description}
        </p>
      ) : null}
      {isInvalid ? (
        <p className="text-sm text-error" id={errorMessageId}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};
