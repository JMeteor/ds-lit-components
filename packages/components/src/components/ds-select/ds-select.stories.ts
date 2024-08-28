import { html } from 'lit';
import { Meta, StoryFn } from '@storybook/web-components';

const meta = {
  title: 'Components/Select',
  component: 'ds-select',
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    helperText: {
      control: { type: 'text' },
    },
    placeholder: {
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
  return html`
    <ds-select
      .disabled="${args.disabled || false}"
      .size="${args.size || 'md'}"
      .hierarchy="${args.hierarchy || 'primary'}"
      .value="${args.value}"
      .error="${args.error}"
      .placeholder="${args.placeholder || 'Placeholder'}"
      .options=${['Option 1', 'Option 2', 'Option 3']}
    >
      <span slot="label">${args.label || 'Label'}</span>
      <span slot="helperText">${args.helperText || 'Helper text'}</span>
      <span slot="iconRight">
        <ds-icon .size=${args.size} name="chevron-down" />
      </span>
    </ds-select>
  `;
};
