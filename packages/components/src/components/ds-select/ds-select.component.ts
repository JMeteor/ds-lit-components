import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query, queryAll } from 'lit/decorators.js';
import { computePosition, offset, size } from '@floating-ui/dom';
import { styles } from './ds-select.styles';
import { ElementInternals } from 'element-internals-polyfill/dist/element-internals';
import { getTrimmedSlotText } from '../../shared/slot-utils.ts';

@customElement('ds-select')
export class DsSelect extends LitElement {
  static styles = styles;
  private _internals: ElementInternals;

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

  @property({ type: String, reflect: true })
  value: string | null = '';

  @property({ type: Boolean })
  private dropdownOpen = false;

  @query('.input')
  _input!: HTMLInputElement;

  @query('.dropdown')
  _dropdown!: HTMLElement;

  @queryAll('.dropdown-item')
  _options!: NodeListOf<HTMLElement>;

  _labelSlot?: HTMLSlotElement | null;
  _helperTextSlot?: HTMLSlotElement | null;

  private selectedIndex = -1;

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.role = 'listbox';
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener('click', this.closeDropdown);
    this.addEventListener('keydown', this.handleKeyDown);

    this.updateComplete.then(() => {
      this._labelSlot = this.shadowRoot?.querySelector('slot[name="label"]');
      this._helperTextSlot = this.shadowRoot?.querySelector(
        'slot[name="helperText"]'
      );

      this.updateAriaLabel();
      this.updateAriaDescription();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('click', this.closeDropdown);
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  async updated(changedProperties: PropertyValues) {
    if (changedProperties.has('disabled')) {
      this._internals.ariaDisabled = this.disabled ? 'true' : 'false';
    }

    if (changedProperties.has('error')) {
      this._internals.ariaInvalid = this.error ? 'true' : 'false';
    }

    if (changedProperties.has('placeholder')) {
      this._internals.ariaPlaceholder = this.placeholder;
    }

    // TODO: Detect slot changes
    // console.log(changedProperties);

    if (changedProperties.has('dropdownOpen') && this.dropdownOpen) {
      computePosition(this._input, this._dropdown, {
        placement: 'bottom-start',
        middleware: [
          size({
            apply({ rects, elements }) {
              Object.assign(elements.floating.style, {
                width: `${rects.reference.width}px`,
              });
            },
          }),
          offset(1),
        ],
      }).then(({ x, y }) => {
        const element = this._dropdown;
        Object.assign(element.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    }
  }

  private onClick(event: Event) {
    if (this.disabled) return;

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
    if (this.selectedIndex >= 0 && this.selectedIndex < this._options.length) {
      (this._options[this.selectedIndex] as HTMLElement).focus();
    }
  }

  private focusInput() {
    this._input.focus();
  }

  private navigateOptions(direction: number) {
    const newIndex = this.selectedIndex + direction;

    if (newIndex >= 0 && newIndex < this._options.length) {
      this.selectedIndex = newIndex;
      this.requestUpdate();
      this.focusOption();
    }
  }

  private selectOption() {
    if (this.selectedIndex >= 0 && this.selectedIndex < this._options.length) {
      this.selected = this._options[this.selectedIndex].dataset.value ?? '';
      this.error = false;
      this.closeDropdown();
      this.focusInput();
    }
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;

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

  private updateAriaLabel() {
    if (this._labelSlot) {
      this._internals.ariaLabel = getTrimmedSlotText(this._labelSlot);
    }
  }

  private updateAriaDescription() {
    if (this._helperTextSlot) {
      this._internals.ariaDescription = getTrimmedSlotText(
        this._helperTextSlot
      );
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
