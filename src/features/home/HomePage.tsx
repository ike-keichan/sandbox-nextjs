'use client';

import { useState } from 'react';

import { Alert } from '~/components/Alert';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { TextField } from '~/components/TextField';
import { TextLink } from '~/components/TextLink';

import type { SyntheticEvent } from 'react';

const NAME_MIN_LENGTH = 2;

/**
トップページの中身

部品の使い方の見本を兼ねている。名前を入力して送信すると、お知らせが表示される。
*/
export const HomePage = () => {
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name.trim().length < NAME_MIN_LENGTH) {
      setErrorMessage(`${NAME_MIN_LENGTH}文字以上で入力してください。`);
      setSubmittedName(null);
      return;
    }

    setErrorMessage(undefined);
    setSubmittedName(name.trim());
  };

  return (
    <main className="mx-auto grid max-w-160 gap-8 px-4 py-8">
      <h1 className="text-3xl font-bold">hello world!</h1>

      <section className="grid gap-3">
        <h2 className="text-lg font-bold">入力の見本</h2>
        <form className="grid gap-4" noValidate onSubmit={handleSubmit}>
          <TextField
            description="送信すると、下にお知らせが表示されます。"
            errorMessage={errorMessage}
            label="お名前"
            onChange={(event) => setName(event.target.value)}
            required
            value={name}
          />
          <Checkbox
            checked={agreed}
            label="内容を確認しました"
            onChange={(event) => setAgreed(event.target.checked)}
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button disabled={!agreed} type="submit">
              送信する
            </Button>
            <Button
              onClick={() => {
                setName('');
                setAgreed(false);
                setSubmittedName(null);
                setErrorMessage(undefined);
              }}
              variant="secondary"
            >
              リセット
            </Button>
          </div>
        </form>
        {submittedName === null ? null : (
          <Alert title="送信しました" variant="success">
            {submittedName} さん、こんにちは。
          </Alert>
        )}
      </section>

      <section className="grid gap-3">
        <h2 className="text-lg font-bold">リンクの見本</h2>
        <div className="flex flex-wrap items-center gap-3">
          <TextLink href="/api/hello">API の見本</TextLink>
          <TextLink external href="https://nextjs.org/docs">
            Next.js の説明
          </TextLink>
        </div>
      </section>
    </main>
  );
};
