import type { Meta, StoryObj } from '@storybook/react';

import { TooltipCustom } from '../../components/atoms/Tooltip';

const meta = {
  component: TooltipCustom,
  parameters: ['centered'],
  tags: ['autodocs'],
} satisfies Meta<typeof TooltipCustom>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Tooltip',
  },
};
