import type { Meta, StoryObj } from '@storybook/react';

import {
  SelectOption,
  type SelectOptionProps,
} from '../../components/atoms/Select';

const meta = {
  component: SelectOption,
  argTypes: {
    onChange: { action: 'changed' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SelectOption>;

export default meta;

type Story = StoryObj<typeof meta>;

const fruits: SelectOptionProps[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'grapes', label: 'Grapes' },
  { value: 'pineapple', label: 'Pineapple' },
];

export const Default: Story = {
  args: {
    placeholder: 'Select a fruit',
    label: 'Fruits',
    options: fruits,
    defaultValue: 'apple',
    className: 'w-[180px]',
  },
};
