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
      name="test"
      .disabled="${args.disabled}"
      .size="${args.size || 'md'}"
      .hierarchy="${args.hierarchy || 'primary'}"
      .error="${args.error}"
      .value="${args.value || ''}"
      @input="${() => console.log('Input event fired!')}"
    >
      <span slot="label">
        ${args.label || 'Label'}
      </span>
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

export const FormValue = () => {
  const logFormChange = (event: Event) => {
    const target = event.target as any;
    const formData = new FormData(target.internals.form as HTMLFormElement);
    // const formDataObj = Object.fromEntries(formData.entries());
    // action('change')(formDataObj);
  };
  return html`
    <form @input=${logFormChange}>
      <ds-text-input name="test"></ds-text-input>
    </form>
  `;
};
