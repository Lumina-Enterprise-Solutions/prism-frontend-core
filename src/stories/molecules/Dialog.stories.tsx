import type { Meta, StoryObj } from '@storybook/react';

import { DialogCustom } from '../../components/molecules/Dialog';
import { Button } from '../../components/atoms/Button';

const meta: Meta<typeof DialogCustom> = {
  component: DialogCustom,
  argTypes: {
    trigger: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    footer: { control: 'text' },
    contentClassName: { control: 'text' },
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DialogCustom>;

export const Default: Story = {
  args: {
    trigger: <Button>Open Dialog</Button>,
    title: 'Dialog Title',
    description:
      'This is the dialog description. It gives more info about the dialog.',
    children: (
      <p>
        Here is the main content of the dialog. You can put any React node here,
        like forms, text, images, etc.
      </p>
    ),
    footer: (
      <>
        <Button type="submit">Save changes</Button>
      </>
    ),
    contentClassName: 'max-w-md',
  },
};
