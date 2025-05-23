import type { Meta, StoryObj } from '@storybook/react';
import { ReusablePopover } from '../../components/atoms/Popover';
import { Button } from '@radix-ui/themes'; // atau pakai button biasa
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';

const meta: Meta<typeof ReusablePopover> = {
  component: ReusablePopover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ReusablePopover>;

export const Default: Story = {
  render: (args) => (
    <ReusablePopover
      {...args}
      trigger={
        <Button variant="soft">
          <ChatBubbleIcon width="16" height="16" />
          Comment
        </Button>
      }
    >
      <div className="p-4 space-x-1 gap-2">
        <p className="hover:bg-amber-200 py-2">This is some popover content.</p>
        <p>This is some popover content.</p>
        <Popover.Close asChild>
          <Button size="1" variant="outline" style={{ marginTop: '1rem' }}>
            Close
          </Button>
        </Popover.Close>
      </div>
    </ReusablePopover>
  ),
  args: {
    width: '300px',
  },
};
