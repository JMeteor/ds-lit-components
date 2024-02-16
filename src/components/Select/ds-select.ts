import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { computePosition, offset, size } from '@floating-ui/dom'
import { MaybeHTMLElement } from '../../helpers/types.ts'

@customElement('ds-select')
export class DsSelect extends LitElement {
  @property({ type: String })
  size = 'md'

  @property({ type: String })
  hierarchy = 'primary'

  @property({ type: Boolean })
  showLabel = false

  @property({ type: Boolean })
  showHint = false

  @property({ type: Boolean })
  showIcon = true

  @property({ type: Boolean })
  showError = true

  @property({ type: Boolean, reflect: true })
  disabled = false

  @property({ type: Array })
  options = []

  @property({ type: String })
  placeholder = 'Placeholder'

  @property({ type: String })
  selected = ''

  @property({ type: Boolean })
  private dropdownOpen = false

  firstUpdated() {
    const input: MaybeHTMLElement =
      this.shadowRoot?.querySelector('.select_wrapper')
    const dropdown: MaybeHTMLElement =
      this.shadowRoot?.querySelector('.select_dropdown')

    if (input && dropdown) {
      computePosition(input, dropdown, {
        placement: 'bottom-start',
        middleware: [
          offset(4),
          size({
            apply({ rects }) {
              Object.assign(dropdown.style, {
                width: `${rects.reference.width}px`,
              })
            },
          }),
        ],
      }).then(({ x, y }) => {
        Object.assign(dropdown.style, {
          left: `${x}px`,
          top: `${y}px`,
        })
      })
    }
  }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('click', this.closeDropdown)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('click', this.closeDropdown)
  }

  private onClick(event: Event) {
    event.stopPropagation()
    const value = (event.target as HTMLLIElement).dataset.value
    if (value !== undefined) {
      this.selected = value
      this.showError = false
    }
    this.requestUpdate()
    this.closeDropdown()
  }

  private toggleDropdown(event: Event) {
    event.stopPropagation()
    this.dropdownOpen = !this.dropdownOpen
  }

  private closeDropdown = () => {
    this.dropdownOpen = false
  }

  _iconColor() {
    if (this.showError) {
      return 'var(--base-error)'
    }
    if (this.hierarchy === 'secondary' && this.disabled) {
      return 'var(--secondary-300)'
    }
    if (this.hierarchy === 'secondary') {
      return 'var(--secondary-700)'
    }
    if (this.disabled) {
      return 'var(--primary-300)'
    }
    return 'var(--primary-700)'
  }

  render() {
    const classes = {
      select: true,
      'select--md': this.size === 'md',
      'select--sm': this.size === 'sm',
      'select--primary': this.hierarchy === 'primary',
      'select--secondary': this.hierarchy === 'secondary',
      'select--disabled': this.disabled,
      'select--error': this.showError,
    }

    return html`<div class=${classMap(classes)} @click="${this.toggleDropdown}">
      ${this.showLabel
        ? html`<label class="select_label"><slot name="label"></slot></label>`
        : ''}
      <div class="select_wrapper">
        <input
          class="select_input"
          type="text"
          readonly
          placeholder=${this.placeholder}
          value="${this.selected}"
          ?disabled=${this.disabled}
        />
        ${this.showIcon
          ? html` <ds-icon
              .size=${this.size}
              .name=${'chevron-down'}
              .color=${this._iconColor()}
            ></ds-icon>`
          : ''}
      </div>
      <ul
        @click="${this.onClick}"
        class="select_dropdown ${this.dropdownOpen
          ? 'select_dropdown--open'
          : ''}"
      >
        ${this.options.map(
          (option) =>
            html`<li class="select_dropdown_item" data-value=${option}>
              ${option}
            </li>`
        )}
      </ul>
      ${this.showError
        ? html`<p class="select_error"><slot name="error"></slot></p>`
        : this.showHint
        ? html`<p class="select_hint"><slot name="hint"></slot></p>`
        : ''}
    </div>`
  }

  static styles = css`
    .select_wrapper {
      display: inline-flex;
      align-items: center;
      position: relative;
    }
    .select_label {
      color: var(--primary-700);
      display: block;
      font-size: 14px;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 4px;
    }
    .select_input {
      box-sizing: border-box;
      border-color: var(--primary-700);
      border-radius: 8px;
      border-style: solid;
      border-width: 1px;
      color: black;
      font-size: 16px;
      min-width: 200px;
      height: 40px;
      padding: 10px 16px;
      &::placeholder {
        color: var(--primary-300);
      }
      &:focus {
        outline: none;
      }
    }
    ds-icon {
      cursor: pointer;
      position: absolute;
      right: 16px;
    }
    .select_hint,
    .select_error {
      display: block;
      font-size: 12px;
      margin: 4px 0 0 0;
    }
    .select_hint {
      color: var(--primary-500);
    }
    .select_error {
      color: var(--base-error);
    }

    .select_dropdown {
      background: var(--base-white);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      margin: 0;
      padding: 2px 0;
      border-radius: 8px;
      box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      width: max-content;
      list-style: none;
      display: none;
      &.select_dropdown--open {
        display: block;
      }
    }
    .select_dropdown_item {
      cursor: pointer;
      font-size: 16px;
      padding: 6px 16px;
      &:hover {
        background: var(--primary-100);
      }
    }
    .select {
      display: inline-block;
      font-family: var(--font-inter);
      &.select--sm {
        & .select_input {
          height: 32px;
        }
        & .select_dropdown_item {
          padding: 3px 16px;
        }
      }
      &.select--secondary {
        & .select_label,
        & .select_hint {
          color: var(--secondary-700);
        }
        & .select_input {
          border-color: var(--secondary-700);
          &::placeholder {
            color: var(--secondary-500);
          }
        }
      }
      &.select--disabled {
        cursor: default;
        pointer-events: none;
        & .select_label,
        & .select_hint,
        & .select_input {
          color: var(--primary-300);
        }
        & .select_input {
          border-color: var(--primary-300);
        }
        &.select--secondary {
          & .select_label,
          & .select_hint,
          & .select_input {
            color: var(--secondary-300);
          }
          & .select_input {
            border-color: var(--secondary-300);
            &::placeholder {
              color: var(--secondary-300);
            }
          }
        }
      }
      &.select--error {
        & .select_input {
          border-color: var(--base-error);
        }
      }
    }
  `
}
