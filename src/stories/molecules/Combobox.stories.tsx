import type { Meta, StoryObj } from '@storybook/react';

import {
  Combobox,
  type ComboboxOption,
} from '../../components/molecules/Combobox';

const meta = {
  component: Combobox,
  argTypes: {
    options: {
      control: false, // complex type, tidak bisa diubah lewat control biasa
    },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
    className: { control: 'text' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

const exampleOptions: ComboboxOption[] = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
];

export const Default: Story = {
  args: {
    options: exampleOptions,
    placeholder: 'Select framework...',
    value: '',
  },
};
