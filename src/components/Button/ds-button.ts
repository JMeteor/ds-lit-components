import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

@customElement('ds-button')
export class DsButton extends LitElement {
  @property({ type: String })
  size = 'md'

  @property({ type: String })
  hierarchy = 'primary'

  @property({ type: String })
  type = 'filled'

  @property({ type: Boolean })
  iconBefore = false

  @property({ type: Boolean })
  iconAfter = false

  @property({ type: Boolean, reflect: true })
  disabled = false

  constructor() {
    super()
  }

  render() {
    const classes = {
      button: true,
      [`button--${this.size}`]: ['md', 'sm'].includes(this.size),
      [`button--${this.hierarchy}`]: ['primary', 'secondary'].includes(
        this.hierarchy
      ),
      [`button--${this.type}`]: ['filled', 'outlined'].includes(this.type),
    }

    return html`
      <button class=${classMap(classes)} ?disabled=${this.disabled}>
        <slot name="iconBefore"></slot>
        <slot></slot>
        <slot name="iconAfter"></slot>
      </button>
    `
  }

  static styles = css`
    .button {
      border-radius: 8px;
      border-width: 1px;
      border-style: solid;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;

      font-family: var(--font-inter);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      &:focus {
        outline: none;
      }

      &.button--primary {
        background: var(--primary-700);
        border-color: var(--primary-700);
        color: var(--primary-100);

        &:hover {
          background: var(--primary-500);
          border-color: var(--primary-500);
        }

        &:focus {
          background: var(--primary-500);
          border-color: var(--primary-700);
        }
      }

      &.button--outlined {
        background: white;
        border-color: var(--primary-700);
        color: var(--primary-700);

        &:hover {
          background: var(--primary-100);
          border-color: var(--primary-500);
        }
      }

      &.button--secondary {
        background: var(--secondary-700);
        border-color: var(--secondary-700);
        color: var(--secondary-100);

        &:hover {
          background: var(--secondary-500);
          border-color: var(--secondary-500);
        }

        &:focus {
          background: var(--secondary-500);
          border-color: var(--secondary-700);
        }

        &.button--outlined {
          background: white;
          border-color: var(--secondary-700);
          color: var(--secondary-700);

          &:hover {
            background: var(--secondary-100);
            border-color: var(--secondary-500);
          }
        }
      }

      &.button--sm {
        border-radius: 6px;
        font-size: 14px;
        padding: 8px 16px;
      }
    }

    :host([disabled]) .button {
      pointer-events: none;
      &.button--primary {
        background: var(--primary-300);
        border-color: var(--primary-300);
      }
      &.button--outlined {
        background: white;
        border-color: var(--primary-300);
        color: var(--primary-500);
        & .icon {
          background: var(--primary-500);
        }
      }
      &.button--secondary {
        background: var(--secondary-300);
        border-color: var(--secondary-300);
        &.button--outlined {
          background: white;
          border-color: var(--secondary-300);
          color: var(--secondary-500);
        }
      }
    }
  `
}
