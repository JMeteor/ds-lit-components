import { html } from 'lit';
import { Meta, StoryFn } from '@storybook/web-components';

const meta = {
  title: 'Components/Button',
  component: 'ds-button',
  argTypes: {
    text: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'radio' },
      options: ['md', 'sm'],
    },
    hierarchy: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
    type: {
      control: { type: 'radio' },
      options: ['filled', 'outlined'],
    },
    submit: {
      control: { type: 'boolean' },
    },
    iconBefore: {
      control: { type: 'boolean' },
    },
    iconAfter: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta;
export default meta;

export const Button: StoryFn = (args) => {
  const iconBeforeHTML = args.iconBefore
    ? html`<ds-icon name="chevron-down"></ds-icon>`
    : null;
  const iconAfterHTML = args.iconAfter
    ? html`<ds-icon name="chevron-down"></ds-icon>`
    : null;

  return html`
    <ds-button
      .disabled="${args.disabled}"
      .size="${args.size || 'md'}"
      .hierarchy="${args.hierarchy || 'primary'}"
      .type="${args.type || 'filled'}"
      .iconBefore="${args.iconBefore}"
      .iconAfter="${args.iconAfter}"
      .submit="${args.submit}"
    >
      <span slot="iconBefore"
        >${iconBeforeHTML}</ds-icon
      ></span>
      ${args.text || 'Label'}
      <span slot="iconAfter">${iconAfterHTML}</span>
    </ds-button>
  `;
};

// export const ButtonForm: StoryFn = (args) => {
//   const handleSubmit = (e: Event) => {
//     e.preventDefault();
//     alert('Form submitted');
//   };
//
//   return html`
//     <form @submit=${handleSubmit}>
//       <ds-button submit>Submit</ds-button>
//     </form>
//   `;
// };
