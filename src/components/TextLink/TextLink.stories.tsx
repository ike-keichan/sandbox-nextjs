import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TextLink } from './TextLink';

const meta = {
  component: TextLink,
  args: {
    children: 'リンクの文字',
    href: '/',
  },
} satisfies Meta<typeof TextLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Internal: Story = {};

export const External: Story = {
  args: {
    children: 'Next.js のサイト',
    external: true,
    href: 'https://nextjs.org',
  },
};
