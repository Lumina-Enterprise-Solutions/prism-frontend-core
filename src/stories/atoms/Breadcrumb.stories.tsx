import type { Meta, StoryObj } from '@storybook/react';

import { BreadcrumbDynamic } from '../../components/atoms/Breadcrumb';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const meta: Meta<typeof BreadcrumbDynamic> = {
  component: BreadcrumbDynamic,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/components/button/icon']}>
      <Routes>
        <Route path="*" element={<BreadcrumbDynamic />} />
      </Routes>
    </MemoryRouter>
  ),
};
