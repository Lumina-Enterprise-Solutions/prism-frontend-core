import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/atoms/Label';

const meta = {
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Textarea placeholder="Type your message here." />,
};

export const Disabled: Story = {
  render: () => <Textarea placeholder="Type your message here." disabled />,
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  ),
};
