import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../components/atoms/Badge';

const meta = {
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Badge variant="default" {...args} />,

  args: {
    children: 'Default Badge',
  },
};
