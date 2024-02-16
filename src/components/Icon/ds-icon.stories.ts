import { html } from 'lit'
import { Meta, StoryFn } from '@storybook/web-components'
import './ds-icon'

const meta = {
  title: 'Components/Icon',
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md'],
    },
    name: {
      control: 'radio',
      options: ['chevron-down', 'info-circle'],
    },
    color: {
      control: {
        type: 'color',
        presetColors: ['#d8b2e6', '#7e329a', '#eaebad', '#a2a428'],
      },
    },
  },
} satisfies Meta
export default meta

export const Icon: StoryFn = (args) => html`
  <ds-icon
    .size="${args.size || 'md'}"
    .name="${args.name || 'chevron-down'}"
    .color="${args.color || 'var(--primary-700)'}"
  />
`
