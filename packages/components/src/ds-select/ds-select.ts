import { css, html, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { computePosition, offset, size } from '@floating-ui/dom';
import { MaybeHTMLElement } from '../types/MaybeHTMLElement.ts';

@customElement('ds-select')
export class DsSelect extends LitElement {
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String, reflect: true })
  hierarchy = 'primary';

  @property({ type: String, reflect: true })
  size = 'md';

  @property({ type: Array })
  options = [];

  @property({ type: String })
  placeholder = 'Placeholder';

  @property({ type: String })
  selected = '';

  @property({ type: Boolean })
  private dropdownOpen = false;

  async updated(changedProperties: PropertyValues) {
    if (changedProperties.has('dropdownOpen') && this.dropdownOpen) {
      const input: MaybeHTMLElement = this.shadowRoot?.querySelector('.input');
      const dropdown: MaybeHTMLElement =
        this.shadowRoot?.querySelector('.dropdown');

      if (input && dropdown) {
        computePosition(input, dropdown, {
          placement: 'bottom-start',
          middleware: [
            size({
              apply({ rects }) {
                Object.assign(dropdown.style, {
                  width: `${rects.reference.width}px`,
                });
              },
            }),
            offset(1),
          ],
        }).then(({ x, y }) => {
          console.log(x, y);
          Object.assign(dropdown.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
        });
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('click', this.closeDropdown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('click', this.closeDropdown);
  }

  private onClick(event: Event) {
    event.stopPropagation();
    const value = (event.target as HTMLLIElement).dataset.value;
    if (value !== undefined) {
      this.selected = value;
      this.error = false;
    }
    this.requestUpdate();
    this.closeDropdown();
  }

  private toggleDropdown(event: Event) {
    event.stopPropagation();

    if (!this.disabled) {
      this.dropdownOpen = !this.dropdownOpen;
    }
  }

  private closeDropdown = () => {
    this.dropdownOpen = false;
  };

  render() {
    return html` <div class="wrapper">
      <label>
        <slot name="label"></slot>
      </label>
      <div class="input-wrapper" @click="${this.toggleDropdown}">
        <input
          class="input"
          ?disabled=${this.disabled}
          placeholder=${this.placeholder}
          readonly
          type="text"
          value="${this.selected}"
        />
        <slot name="iconRight"></slot>

        <div
          @click="${this.onClick}"
          class="dropdown ${this.dropdownOpen ? 'open' : ''}"
        >
          ${this.options.map(
            (option) =>
              html`<div
                class="dropdown-item ${this.selected === option
                  ? 'selected'
                  : ''}"
                data-value=${option}
                tabindex="0"
              >
                ${option}
              </div>`
          )}
        </div>
      </div>
      <p class="helperText ${this.error ? 'error' : 'hint'}">
        <slot name="helperText"></slot>
      </p>
    </div>`;
  }

  static styles = css`
    :host {
      font-family: 'Inter', sans-serif;
    }
    .wrapper {
      display: inline-flex;
      flex-direction: column;
      position: relative;
    }
    :host label {
      display: block;
      font-size: 14px;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 4px;
    }

    :host input {
      box-sizing: border-box;
      border-radius: 8px;
      border-style: solid;
      border-width: 1px;
      color: black;
      font-size: 16px;
      min-width: 200px;
      height: 40px;
      padding: 10px 16px;
    }
    .input-wrapper {
      position: relative;
    }

    .input-wrapper ::slotted([slot='iconRight']) {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
    }

    :host([hierarchy='primary']) label {
      color: var(--ds-input-primary-label);
    }
    :host([hierarchy='primary']) input {
      border-color: var(--ds-input-primary-stroke);
      color: var(--ds-input-primary-text);
    }
    :host([hierarchy='primary']) input::placeholder {
      color: var(--ds-input-primary-placeholder);
    }
    :host([hierarchy='primary']) .hint {
      color: var(--ds-feedback-primary-hint);
    }
    :host([hierarchy='primary'][disabled]) label {
      color: var(--ds-input-primary-label-disabled);
    }
    :host([hierarchy='primary'][disabled]) input {
      border-color: var(--ds-input-primary-stroke-disabled);
      color: var(--ds-input-primary-text-disabled);
    }
    :host([hierarchy='primary'][disabled]) .hint {
      color: var(--ds-feedback-primary-hint-disabled);
    }

    :host([hierarchy='secondary']) label {
      color: var(--ds-input-secondary-label);
    }
    :host([hierarchy='secondary']) input {
      border-color: var(--ds-input-secondary-stroke);
      color: var(--ds-input-secondary-text);
    }
    :host([hierarchy='secondary']) input::placeholder {
      color: var(--ds-input-secondary-placeholder);
    }
    :host([hierarchy='secondary']) .hint {
      color: var(--ds-feedback-secondary-hint);
    }
    :host([hierarchy='secondary'][disabled]) label {
      color: var(--ds-input-secondary-label-disabled);
    }
    :host([hierarchy='secondary'][disabled]) input {
      border-color: var(--ds-input-secondary-stroke-disabled);
      color: var(--ds-input-secondary-text-disabled);
    }
    :host([hierarchy='secondary'][disabled]) .hint {
      color: var(--ds-feedback-secondary-hint-disabled);
    }

    :host([size='sm']) input {
      height: 32px;
    }

    :host([error]) input {
      border-color: var(--ds-input-danger-stroke);
    }

    .helperText {
      display: block;
      font-size: 12px;
      margin: 4px 0 0 0;
    }

    .error {
      color: var(--ds-feedback-danger-hint);
    }

    .dropdown {
      background: var(--ds-dropdown-neutral-surface);
      position: absolute;
      margin: 0;
      padding: 2px 0;
      border-radius: 8px;
      box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      width: max-content;
      list-style: none;
      display: none;
      &.open {
        display: block;
      }
    }
    .dropdown-item {
      cursor: pointer;
      font-size: 16px;
      padding: 6px 16px;
      position: relative;
    }

    .dropdown-item.selected::before {
      position: absolute;
      content: '';
      left: 0;
      top: 0;
      height: 100%;
      width: 3px;
    }

    :host([hierarchy='primary']) .dropdown-item.selected {
      color: var(--ds-dropdown-primary-text-selected);
      &::before {
        background: var(--ds-dropdown-primary-text-selected);
      }
    }

    :host([hierarchy='secondary']) .dropdown-item.selected {
      color: var(--ds-dropdown-secondary-text-selected);
      &::before {
        background: var(--ds-dropdown-secondary-text-selected);
      }
    }
  `;
}
