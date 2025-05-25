import type { Meta, StoryObj } from '@storybook/react';
import * as Form from '@radix-ui/react-form';
import { PasswordInput } from '../../components/atoms/InputPassword';

const meta = {
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Form.Root>
      <PasswordInput {...args} />
    </Form.Root>
  ),

  args: {
    id: 'password',
    name: 'password',
    label: 'Password',
    placeholder: 'password',
    message: 'Please enter a valid password',
    required: true,
  },
};
