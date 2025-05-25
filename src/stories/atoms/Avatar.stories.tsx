import type { Meta, StoryObj } from '@storybook/react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/atoms/Avatar';

const meta = {
  component: Avatar,
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj;

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="Avatar with image"
      />
      <AvatarFallback>KB</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallbackOnly: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="" alt="Fallback only" />
      <AvatarFallback>KB</AvatarFallback>
    </Avatar>
  ),
};
