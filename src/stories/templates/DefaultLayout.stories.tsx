import type { Meta, StoryObj } from '@storybook/react';

import DefaultLayout from '../../components/templates/default-layout';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

function DummyContent() {
  return <div className="p-4 bg-muted rounded">This is page content</div>;
}

function LayoutWithRouter({ path = '/dashboard' }: { path?: string }) {
  return (
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="*"
          element={
            <DefaultLayout>
              <DummyContent />
            </DefaultLayout>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

const meta = {
  component: DefaultLayout,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DefaultLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <LayoutWithRouter path="/dashboard" />,
};

export const SettingsPage: Story = {
  render: () => <LayoutWithRouter path="/settings/profile" />,
};
