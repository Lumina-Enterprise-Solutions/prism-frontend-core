import type { Meta, StoryObj } from '@storybook/react';

import { CustomPagination } from '../../components/atoms/Pagination';

const meta = {
  component: CustomPagination,
  argTypes: {
    totalPages: { control: 'number' },
    currentPage: { control: 'number' },
    onPageChange: { action: 'pageChanged' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomPagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalPages: 10,
    currentPage: 2,
  },
};
