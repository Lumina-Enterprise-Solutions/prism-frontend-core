import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/atoms/Button';
import { ToastContextProvider } from '../../context/ToastProvider';
import { useToast } from '../../hooks/use-toast';

const meta = {
  component: ToastCustom,
  decorators: [
    (Story) => (
      <ToastContextProvider>
        <Story />
      </ToastContextProvider>
    ),
  ],
} satisfies Meta<typeof ToastCustom>;

function ToastCustom() {
  const { addToast } = useToast();

  return (
    <div className="p-4 space-y-4">
      <Button
        onClick={() =>
          addToast({
            title: 'Default Toast',
            description: 'This is a basic toast message.',
            variant: 'default',
          })
        }
      >
        Show Default Toast
      </Button>

      <Button
        variant="destructive"
        onClick={() =>
          addToast({
            title: 'Error',
            description: 'Something went wrong.',
            variant: 'destructive',
          })
        }
      >
        Show Destructive Toast
      </Button>
    </div>
  );
}

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ToastCustom />,
};
