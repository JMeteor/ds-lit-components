import { html } from 'lit'
import { Meta, StoryFn } from '@storybook/web-components'
import './ds-button'
import '../Icon/ds-icon'
// import { spreadProps } from '@open-wc/lit-helpers'

const meta = {
  title: 'Components/Button',
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
} satisfies Meta
export default meta

export const Button: StoryFn = (args) => {
  const iconBeforeHTML = args.iconBefore
    ? html`<ds-icon name="chevron-down"></ds-icon>`
    : null
  const iconAfterHTML = args.iconAfter
    ? html`<ds-icon name="chevron-down"></ds-icon>`
    : null

  return html`
    <ds-button
      .disabled="${args.disabled}"
      .size="${args.size}"
      .hierarchy="${args.hierarchy}"
      .type="${args.type}"
      .iconBefore="${args.iconBefore}"
      .iconAfter="${args.iconAfter}"
    >
      <span slot="iconBefore"
        >${iconBeforeHTML}</ds-icon
      ></span>
      ${args.text || 'Button label'}
      <span slot="iconAfter">${iconAfterHTML}</span>
    </ds-button>
  `
}
