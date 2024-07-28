import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { computePosition, offset, size } from '@floating-ui/dom';
import { MaybeHTMLElement } from '../../types/MaybeHTMLElement.ts';
import { styles } from './ds-select.styles';

@customElement('ds-select')
export class DsSelect extends LitElement {
  static styles = styles;
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
}
