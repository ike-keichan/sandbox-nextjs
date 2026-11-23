import { TextLink } from '~/components/TextLink';

import { GreetingForm } from './GreetingForm';
import styles from './HomePage.module.css';

/**
 * トップページの中身
 *
 * 部品の使い方の見本を兼ねている。
 * この部品は、サーバーの側で動く（Server Component）。操作に反応する部分（GreetingForm）だけを、
 * ブラウザの側で動く部品（Client Component）にしている。
 */
export const HomePage = () => (
  <main className={styles.main}>
    <h1 className={styles.heading}>hello world!</h1>

    <section className={styles.section}>
      <h2 className={styles.sectionHeading}>入力の見本</h2>
      <GreetingForm />
    </section>

    <section className={styles.section}>
      <h2 className={styles.sectionHeading}>リンクの見本</h2>
      <div className={styles.row}>
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
