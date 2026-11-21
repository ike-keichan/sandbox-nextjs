import { userEvent, within } from '@storybook/test';

import { Button } from './Button';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Button>;

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export const Primary: Story = {
  args: {
    colorType: 'primary',
    children: 'ボタンテキスト',
    disabled: false,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // 対象の要素に対してホバー、アンホバー、クリック動作が行えること
    const canvas = within(canvasElement);
    const buttonElement = canvas.getByRole('button');
    await userEvent.hover(buttonElement);
    await userEvent.unhover(buttonElement);
    await userEvent.click(buttonElement);
  },
};

export const Secondary: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    colorType: 'secondary',
  },
};

export default meta;
