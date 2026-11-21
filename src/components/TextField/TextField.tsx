import { useId } from 'react';

import { classNames } from '~/shared/utils/classNames';

import styles from './TextField.module.css';

import type { TextFieldProps } from './TextField.types';

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
    <div className={styles.root}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required ? (
          <span aria-hidden="true" className={styles.required}>
            *
          </span>
        ) : null}
      </label>
      <input
        {...rest}
        aria-describedby={describedBy}
        aria-invalid={isInvalid}
        className={classNames(styles.input, isInvalid && styles.invalid, className)}
        id={id}
        required={required}
      />
      {description ? (
        <p className={styles.description} id={descriptionId}>
          {description}
        </p>
      ) : null}
      {isInvalid ? (
        <p className={styles.errorMessage} id={errorMessageId}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};
