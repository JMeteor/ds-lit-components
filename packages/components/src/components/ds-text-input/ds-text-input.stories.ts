import { html } from 'lit';
import { Meta, StoryFn } from '@storybook/web-components';

const meta = {
  title: 'Components/Text Input',
  component: 'ds-text-input',
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
    value: {
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
  return html`
    <ds-text-input
      .disabled="${args.disabled}"
      .size="${args.size || 'md'}"
      .hierarchy="${args.hierarchy || 'primary'}"
      .value="${args.value || ''}"
      .error="${args.error}"
      .placeholder="${args.placeholder || 'Placeholder'}"
    >
      <span slot="label"> ${args.label || 'Label'} </span>
      <span slot="helperText">${args.helperText || 'Helper text'}</span>
      <span slot="iconRight">
        <ds-icon .size=${args.size} name="info-circle" />
      </span>
    </ds-text-input>
  `;
};

// export const FormValue = () => {
//   const logFormChange = (event: Event) => {
//     const target = event.target as any;
//     const formData = new FormData(target.internals.form as HTMLFormElement);
//     // const formDataObj = Object.fromEntries(formData.entries());
//     // action('change')(formDataObj);
//   };
//   return html`
//     <form @input=${logFormChange}>
//       <ds-text-input name="test"></ds-text-input>
//     </form>
//   `;
// };
