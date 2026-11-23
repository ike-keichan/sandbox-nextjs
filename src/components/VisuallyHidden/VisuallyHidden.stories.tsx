import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { VisuallyHidden } from './VisuallyHidden';

const meta = {
  component: VisuallyHidden,
  args: {
    children: 'この文字は、画面には表示されません',
  },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
