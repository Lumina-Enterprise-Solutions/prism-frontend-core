import type { Meta, StoryObj } from '@storybook/react';
import * as Form from '@radix-ui/react-form';
import { Input } from '../../components/atoms/Input';

const meta = {
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Form.Root>
      <Input {...args} />
    </Form.Root>
  ),

  args: {
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'name@example.com',
    required: true,
  },
};
