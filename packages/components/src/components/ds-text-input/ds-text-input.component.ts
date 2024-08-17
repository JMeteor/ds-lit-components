import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styles } from './ds-text-input.styles';
import { ElementInternals } from 'element-internals-polyfill/dist/element-internals';

@customElement('ds-text-input')
export class DsTextInput extends LitElement {
  static styles = styles;
  static formAssociated = true;
  _internals: ElementInternals;

  @property({ type: String, reflect: true })
  name = '';

  @property({ type: String, reflect: true })
  id = '';

  // ariaRequired
  @property({ type: Boolean, reflect: true, attribute: 'required' })
  required: boolean = false;

  @property({ type: String, reflect: true })
  value = '';

  // aria-disabled
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  // aria-invalid
  // aria-errormessage
  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String, reflect: true })
  hierarchy = 'primary';

  @property({ type: String, reflect: true })
  size = 'md';

  // ariaPlaceholder
  @property({ type: String, reflect: true })
  placeholder = '';

  @query('input')
  private controlElement!: HTMLInputElement;

  private helperTextId = crypto.randomUUID();

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();

    this._internals.ariaDisabled = this.disabled ? 'true' : 'false';
    this._internals.ariaRequired = this.required ? 'true' : 'false';
    this._internals.ariaInvalid = this.error ? 'true' : 'false';
    this._internals.ariaPlaceholder = this.placeholder;

    this.updateAriaAttributes();
  }

  private updateAriaAttributes() {
    const helperTextSlot = this.shadowRoot?.querySelector(
      'slot[name="helperText"]'
    );

    if (helperTextSlot) {
      if (this.error) {
        this.controlElement.removeAttribute('aria-describedby');
        this.controlElement.setAttribute(
          'aria-errormessage',
          this.helperTextId
        );
      } else {
        this.controlElement.removeAttribute('aria-errormessage');
        this.controlElement.setAttribute('aria-describedby', this.helperTextId);
      }
    } else {
      this.controlElement.removeAttribute('aria-errormessage');
      this.controlElement.removeAttribute('aria-describedby');
    }
  }

  private handleInput() {
    this.value = this.controlElement.value;
    this._internals.setFormValue(this.value);
  }

  render() {
    return html`
      <div class="wrapper">
        <slot name="label"></slot>
        <div class="input-wrapper">
          <input
            type="text"
            name=${this.name}
            id=${this.id}
            .placeholder=${this.placeholder}
            .value=${this.value}
            ?disabled=${this.disabled}
            ?required=${this.required}
            @input=${this.handleInput}
          />
          <slot name="iconRight"></slot>
        </div>
        <p
          id=${this.helperTextId}
          class="helperText ${this.error ? 'error' : 'hint'}"
        >
          <slot name="helperText"></slot>
        </p>
      </div>
    `;
  }
}
