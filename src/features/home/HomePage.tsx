import { TextLink } from '~/components/TextLink';

import { GreetingForm } from './GreetingForm';
import { Heading, Main, Row, Section, SectionHeading } from './HomePage.styled';

/**
 * トップページの中身
 *
 * 部品の使い方の見本を兼ねている。
 */
export const HomePage = () => (
  <Main>
    <Heading>hello world!</Heading>

    <Section>
      <SectionHeading>入力の見本</SectionHeading>
      <GreetingForm />
    </Section>

    <Section>
      <SectionHeading>リンクの見本</SectionHeading>
      <Row>
        {/* API は、ページではないので、external を付ける */}
        <TextLink external href="/api/hello">
          API の見本
        </TextLink>
        <TextLink external href="https://nextjs.org/docs">
          Next.js の説明
        </TextLink>
      </Row>
    </Section>
  </Main>
);
