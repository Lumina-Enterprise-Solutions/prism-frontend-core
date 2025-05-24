import type { Meta, StoryObj } from '@storybook/react';

import { CustomAlert } from '../../components/atoms/Alert';
import { AlertTriangle, CheckCircle2, Info, Terminal } from 'lucide-react';

const meta = {
  component: CustomAlert,
  argTypes: {
    icon: {
      control: {
        type: 'select',
      },
      options: [Terminal, AlertTriangle, Info, CheckCircle2],
      mapping: {
        Terminal,
        AlertTriangle,
        Info,
        CheckCircle2,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomAlert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: Terminal,
    title: 'Heads up!',
    description: 'You can add components to your app using the CLI.',
  },
};

export const Destructive: Story = {
  args: {
    icon: Terminal,
    variant: 'destructive',
    title: 'Heads up!',
    description: 'You can add components to your app using the CLI.',
  },
};
