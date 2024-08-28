import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styles } from './ds-text-input.styles';
import { ElementInternals } from 'element-internals-polyfill/dist/element-internals';
import { getTrimmedSlotText } from '../../shared/slot-utils.ts';

@customElement('ds-text-input')
export class DsTextInput extends LitElement {
  static styles = styles;
  static formAssociated = true;
  _internals: ElementInternals;

  @property({ type: Boolean, reflect: true, attribute: 'required' })
  required: boolean = false;

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String, reflect: true })
  hierarchy = 'primary';

  @property({ type: String, reflect: true })
  size = 'md';

  @property({ type: String, reflect: true })
  placeholder = '';

  @query('input')
  private _input!: HTMLInputElement;

  private _labelSlot?: HTMLSlotElement | null;
  private _helperTextSlot?: HTMLSlotElement | null;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();

    this._internals.ariaDisabled = this.disabled ? 'true' : 'false';
    this._internals.ariaRequired = this.required ? 'true' : 'false';

    this.updateComplete.then(() => {
      this._labelSlot = this.shadowRoot?.querySelector('slot[name="label"]');
      this._helperTextSlot = this.shadowRoot?.querySelector(
        'slot[name="helperText"]'
      );

      this.updateAriaLabel();
      this.updateAriaDescription();
    });
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
  }

  private handleInput() {
    this.value = this._input.value;
    this._internals.setFormValue(this.value);
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
    return html`
      <div class="wrapper">
        <label>
          <slot name="label"></slot>
        </label>
        <div class="input-wrapper">
          <input
            type="text"
            .placeholder=${this.placeholder}
            .value=${this.value}
            ?disabled=${this.disabled}
            ?required=${this.required}
            @input=${this.handleInput}
          />
          <slot name="iconRight"></slot>
        </div>
        <p class="helperText ${this.error ? 'error' : 'hint'}">
          <slot name="helperText"></slot>
        </p>
      </div>
    `;
  }
}
