import type { Meta, StoryObj } from '@storybook/react';

import { ProgressCustom } from '../../components/atoms/Progressbar';

const meta = {
  component: ProgressCustom,
  parameters: ['centered'],
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressCustom>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { targetValue: 50 },
};
