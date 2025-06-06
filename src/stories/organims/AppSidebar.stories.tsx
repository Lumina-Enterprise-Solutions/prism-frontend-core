import type { Meta, StoryObj } from '@storybook/react';

import { AppSidebar } from '../../components/organims/sidebar/app-sidebar';
import { SidebarProvider } from '../../components/ui/sidebar';

const meta = {
  component: AppSidebar,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar />
        <div className="flex-1 p-4">
          <p>Content area</p>
        </div>
      </div>
    </SidebarProvider>
  ),
};
