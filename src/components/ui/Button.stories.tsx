import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

/**
 * Button component stories for the RoofER Training System
 *
 * Demonstrates all button variants, sizes, and states with focus on:
 * - Accessibility compliance
 * - Industry-appropriate styling
 * - Interactive states
 */

const meta = {
  title: 'UI Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Primary UI component for user interaction. Follows WCAG 2.1 AA guidelines with proper focus indicators and semantic HTML.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Button visual style variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size (affects height, padding, and font size)',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
    },
    children: {
      control: { type: 'text' },
      description: 'Button content (text or elements)',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Start Training Module',
    variant: 'primary',
    size: 'md',
  },
};

// Variant examples
export const Primary: Story = {
  args: {
    children: 'Start Safety Training',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'View Progress',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Learn More',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Skip Module',
    variant: 'ghost',
  },
};

// Size examples
export const Small: Story = {
  args: {
    children: 'Quick Action',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Standard Button',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Primary Action',
    size: 'lg',
  },
};

// State examples
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const DisabledOutline: Story = {
  args: {
    children: 'Disabled Outline',
    variant: 'outline',
    disabled: true,
  },
};

// Interactive example with action
export const WithAction: Story = {
  args: {
    children: 'Click Me',
    onClick: () => alert('Button clicked! This would start a training module in the real app.'),
  },
};

// Accessibility example
export const AccessibilityExample: Story = {
  args: {
    children: '🔧',
    'aria-label': 'Open tools and equipment training module',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of an icon-only button with proper aria-label for screen readers.',
      },
    },
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="primary" disabled>Primary Disabled</Button>
        <Button variant="secondary" disabled>Secondary Disabled</Button>
        <Button variant="outline" disabled>Outline Disabled</Button>
        <Button variant="ghost" disabled>Ghost Disabled</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all button variants in normal and disabled states.',
      },
    },
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all button sizes.',
      },
    },
  },
};

// Roofing industry context examples
export const RoofingTrainingButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Training Module Actions</h3>
      <Button variant="primary" size="lg">Start Safety Inspection Module</Button>
      <Button variant="secondary">Review Equipment Checklist</Button>
      <Button variant="outline">Download Safety Guidelines</Button>
      <div className="flex gap-2 mt-2">
        <Button variant="ghost" size="sm">Previous Module</Button>
        <Button variant="primary" size="sm">Next Module</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples of buttons in the roofing training context.',
      },
    },
  },
};