import { html } from 'lit';
import { Meta, StoryFn } from '@storybook/web-components';

const meta = {
  title: 'Components/Text Input',
  component: 'ds-text-input',
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    value: {
      control: { type: 'text' },
    },
    helperText: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md'],
    },
    hierarchy: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    error: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta;
export default meta;

export const TextInput: StoryFn = (args) => {
  const iconColor = () => {
    if (args.error) {
      return 'var(--ds-input-danger-icon)';
    }
    if (args.disabled && args.hierarchy === 'primary') {
      return 'var(--ds-input-primary-icon-disabled)';
    }
    if (args.disabled && args.hierarchy === 'secondary') {
      return 'var(--ds-input-secondary-icon-disabled)';
    }
    if (args.hierarchy === 'primary') {
      return 'var(--ds-input-primary-icon)';
    }
    if (args.hierarchy === 'secondary') {
      return 'var(--ds-input-secondary-icon)';
    }
  };

  return html`
    <ds-text-input
      .disabled="${args.disabled}"
      .size="${args.size}"
      .hierarchy="${args.hierarchy}"
      .error="${args.error}"
      .value="${args.value}"
      @input="${() => console.log('Input event fired!')}"
    >
      <span slot="label">${args.label || 'ds-select label'}</span>
      <span slot="helperText">${args.helperText || 'Helper text'}</span>
      <span slot="iconRight"><ds-icon
        .size=${args.size}
        name="info-circle"
        .color=${iconColor()}
      </span>
    </ds-text-input>
    <ds-icon name="info-circle-sm" color="tomato"></ds-icon>
  `;
};
