import { userEvent, within } from '@storybook/test';

import { TextLink } from './TextLink';

import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof TextLink>;

const meta = {
  component: TextLink,
} satisfies Meta<typeof TextLink>;

export const Base: Story = {
  args: {
    href: 'URL',
    children: 'リンクテキスト',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // 対象の要素に対してホバー、アンホバー、クリック動作が行えること
    const canvas = within(canvasElement);
    const linkElement = canvas.getByRole('link');
    await userEvent.hover(linkElement);
    await userEvent.unhover(linkElement);
    await userEvent.click(linkElement);
  },
};

export const Disabled = {
  args: {
    ...Base.args,
    isDisabled: true,
  },
};

export default meta;
