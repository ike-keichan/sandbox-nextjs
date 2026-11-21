import { Button } from './Button';

import type { Meta, StoryObj } from '@storybook/nextjs';

const meta = {
  component: Button,
  args: {
    children: 'ボタン',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
