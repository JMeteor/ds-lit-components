import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { computePosition, offset, size } from '@floating-ui/dom';
import { MaybeHTMLElement } from '../../types/MaybeHTMLElement.ts';
import { styles } from './ds-select.styles';
import { ElementInternals } from 'element-internals-polyfill/dist/element-internals';

@customElement('ds-select')
export class DsSelect extends LitElement {
  static styles = styles;
  private _internals: ElementInternals;

  // ariaDisabled
  @property({ type: Boolean, reflect: true })
  disabled = false;

  // ariaInvalid
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

  @property({ type: String, reflect: true })
  value: string | null = '';

  @property({ type: Boolean })
  private dropdownOpen = false;

  private selectedIndex = -1;

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.role = 'listbox';
  }

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
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('click', this.closeDropdown);
    this.removeEventListener('keydown', this.handleKeyDown);
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

  private focusOption() {
    const options = this.shadowRoot?.querySelectorAll('.dropdown-item');

    if (
      options &&
      this.selectedIndex >= 0 &&
      this.selectedIndex < options.length
    ) {
      (options[this.selectedIndex] as HTMLElement).focus();
    }
  }

  private focusInput() {
    const input = this.shadowRoot?.querySelector('.input');
    if (input) {
      (input as HTMLElement).focus();
    }
  }

  private navigateOptions(direction: number) {
    const options = this.options;
    if (options.length === 0) return;

    const newIndex = this.selectedIndex + direction;

    if (newIndex >= 0 && newIndex < options.length) {
      this.selectedIndex = newIndex;
      this.requestUpdate();
      this.focusOption();
    }
  }

  private selectOption() {
    if (this.selectedIndex >= 0 && this.selectedIndex < this.options.length) {
      this.selected = this.options[this.selectedIndex];
      this.error = false;
      this.closeDropdown();
      this.focusInput();
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!this.dropdownOpen) {
      if (
        event.code === 'ArrowDown' ||
        event.code === 'ArrowUp' ||
        event.code === 'Space'
      ) {
        event.preventDefault();
        this.dropdownOpen = true;
        this.updateComplete.then(() => this.focusOption());
      }
      return;
    }

    switch (event.code) {
      case 'ArrowDown':
        event.preventDefault();
        this.navigateOptions(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.navigateOptions(-1);
        break;
      case 'Enter':
      case 'Space':
        event.preventDefault();
        this.selectOption();
        break;
      case 'Escape':
        event.preventDefault();
        this.closeDropdown();
        this.focusInput();
        break;
    }
  }

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
