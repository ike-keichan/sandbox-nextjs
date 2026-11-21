import { Alert } from './Alert';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  component: Alert,
  args: {
    children: '内容を確認してください。',
    title: 'お知らせ',
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
  },
};

export const Success: Story = {
  args: {
    children: '変更を保存しました。',
    title: '保存しました',
    variant: 'success',
  },
};

// Error という名前は、JavaScript に最初からある Error と重なるので、使わない
export const ErrorAlert: Story = {
  args: {
    children: '時間をおいて、もう一度お試しください。',
    title: '保存できませんでした',
    variant: 'error',
  },
};

export const WithoutTitle: Story = {
  args: {
    title: undefined,
  },
};
