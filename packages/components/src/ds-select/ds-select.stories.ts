import { html } from 'lit';
import { Meta, StoryFn } from '@storybook/web-components';

const meta = {
  title: 'Components/ds-select',
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    hint: {
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
    error: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta;
export default meta;

export const Select: StoryFn = (args) => {
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
    <ds-select
      .disabled="${args.disabled}"
      .size="${args.size}"
      .hierarchy="${args.hierarchy}"
      .value="${args.value}"
      .error="${args.error}"
      .placeholder="${'Placeholder'}"
      .options=${['Option 1', 'Option 2', 'Option 3']}
    >
      <span slot="label">${args.label || 'ds-select label'}</span>
      <span slot="helperText">${args.helperText || 'Helper text'}</span>
      <span slot="iconRight"><ds-icon
        .size=${args.size}
        name="chevron-down"
        .color=${iconColor()}
      </span>
    </ds-select>
  `;
};
