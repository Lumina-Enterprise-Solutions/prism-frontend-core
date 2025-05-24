import type { Meta, StoryObj } from '@storybook/react';

import { Calendar } from '../../components/ui/calendar';

const meta = {
  component: Calendar,
  argTypes: {
    onSelect: { action: 'date selected' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selected: new Date(),
  },
};
