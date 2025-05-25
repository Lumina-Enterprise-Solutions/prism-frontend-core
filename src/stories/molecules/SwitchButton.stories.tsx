import type { Meta, StoryObj } from '@storybook/react';

import { SwitchWithLabel } from '../../components/molecules/SwitchButton';

const meta = {
  component: SwitchWithLabel,
  argTypes: {
    onCheckedChange: { action: 'toggled' },
    labelPosition: {
      control: { type: 'radio' },
      options: ['left', 'right'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SwitchWithLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'airplane-mode',
    label: 'Airplane Mode',
    defaultChecked: false,
    disabled: false,
    labelPosition: 'right',
  },
};
