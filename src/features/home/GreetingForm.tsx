'use client';

import { useRef, useState } from 'react';

import { Alert } from '~/components/Alert';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { TextField } from '~/components/TextField';

import styles from './GreetingForm.module.css';

import type { SyntheticEvent } from 'react';

const NAME_MIN_LENGTH = 2;

/**
 * 名前を入力して送信すると、お知らせを表示するフォーム
 *
 * 部品の使い方の見本を兼ねている。
 */
export const GreetingForm = () => {
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>();
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name.trim().length < NAME_MIN_LENGTH) {
      setErrorMessage(`${NAME_MIN_LENGTH}文字以上で入力してください。`);
      setSubmittedName(null);
      // エラーの入力欄に、フォーカスを移す。
      // 読み上げソフトは、移った先の入力欄の名前と、エラーの内容を読み上げる。
      nameInputRef.current?.focus();
      return;
    }

    setErrorMessage(undefined);
    setSubmittedName(name.trim());
  };

  const handleReset = () => {
    setName('');
    setAgreed(false);
    setSubmittedName(null);
    setErrorMessage(undefined);
  };

  return (
    <>
      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <TextField
          autoComplete="name"
          description="送信すると、下にお知らせが表示されます。"
          errorMessage={errorMessage}
          label="お名前"
          name="name"
          onChange={(event) => setName(event.target.value)}
          ref={nameInputRef}
          required
          value={name}
        />
        <Checkbox
          checked={agreed}
          label="内容を確認しました"
          name="agreed"
          onChange={(event) => setAgreed(event.target.checked)}
        />
        <div className={styles.row}>
          <Button disabled={!agreed} type="submit">
            送信する
          </Button>
          <Button onClick={handleReset} variant="secondary">
            リセット
          </Button>
        </div>
      </form>
      {/* 読み上げの領域は、最初から置いておく。あとから足すと、読み上げられないことがある */}
      <div role="status">
        {submittedName === null ? null : (
          <Alert live={false} title="送信しました" variant="success">
            {submittedName} さん、こんにちは。
          </Alert>
        )}
      </div>
    </>
  );
};
