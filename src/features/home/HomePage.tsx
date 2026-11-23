import { TextLink } from '~/components/TextLink';

import { GreetingForm } from './GreetingForm';

/**
 * トップページの中身
 *
 * 部品の使い方の見本を兼ねている。
 * この部品は、サーバーの側で動く（Server Component）。操作に反応する部分（GreetingForm）だけを、
 * ブラウザの側で動く部品（Client Component）にしている。
 */
export const HomePage = () => (
  <main className="mx-auto grid max-w-160 gap-8 px-4 py-8">
    <h1 className="text-3xl font-bold">hello world!</h1>

    <section className="grid gap-3">
      <h2 className="text-lg font-bold">入力の見本</h2>
      <GreetingForm />
    </section>

    <section className="grid gap-3">
      <h2 className="text-lg font-bold">リンクの見本</h2>
      <div className="flex flex-wrap items-center gap-3">
        {/* API は、ページではないので、external を付ける */}
        <TextLink external href="/api/hello">
          API の見本
        </TextLink>
        <TextLink external href="https://nextjs.org/docs">
          Next.js の説明
        </TextLink>
      </div>
    </section>
  </main>
);
