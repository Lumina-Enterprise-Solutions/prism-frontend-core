import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/atoms/Button';

const meta = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Button {...args} />,

  args: {
    children: 'Default Button',
    variant: 'default',
  },
};
