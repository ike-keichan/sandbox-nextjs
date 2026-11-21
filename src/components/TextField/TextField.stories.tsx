import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TextField } from './TextField';

const meta = {
  component: TextField,
  args: {
    label: 'お名前',
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    description: '姓と名のあいだに、空白を入れてください。',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    defaultValue: 'a',
    errorMessage: '2文字以上で入力してください。',
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: '山田 太郎',
    disabled: true,
  },
};
