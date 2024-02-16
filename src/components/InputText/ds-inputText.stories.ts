import { html } from 'lit'
import { Meta, StoryFn } from '@storybook/web-components'
import './ds-inputText'

const meta = {
  title: 'Components/InputText',
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    value: {
      control: { type: 'text' },
    },
    hint: {
      control: { type: 'text' },
    },
    error: {
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
    showLabel: {
      control: { type: 'boolean' },
    },
    showIcon: {
      control: { type: 'boolean' },
    },
    showHint: {
      control: { type: 'boolean' },
    },
    showError: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta
export default meta

export const InputText: StoryFn = (args) => html`
  <ds-input-text
    .disabled="${args.disabled}"
    .size="${args.size}"
    .hierarchy="${args.hierarchy}"
    .showLabel="${args.showLabel}"
    .showIcon="${args.showIcon}"
    .showHint="${args.showHint}"
    .showError="${args.showError}"
    .value="${args.value}"
    @input="${() => console.log('Input event fired!')}"
  >
    <span slot="label">${args.label || 'Select label'}</span>
    <span slot="hint">${args.hint || 'Hint message'}</span>
    <span slot="error">${args.error || 'Error message'}</span>
  </ds-input-text>
`
