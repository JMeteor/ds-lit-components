import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styles } from './ds-text-input.styles';
import { ElementInternals } from 'element-internals-polyfill/dist/element-internals';

@customElement('ds-text-input')
export class DsTextInput extends LitElement {
  static styles = styles;
  static formAssociated = true;
  internals: ElementInternals;

  // @property({ type: String, reflect: true })
  // name = '';

  @property({ type: Boolean, reflect: true })
  required: boolean = false;

  @property({ type: String })
  value = '';

  // @property({ type: String, reflect: true })
  // ariaDisabled: 'true' | 'false' = 'false';

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String, reflect: true })
  hierarchy = 'primary';

  @property({ type: String, reflect: true })
  size = 'md';

  @property({ type: String })
  placeholder = 'Input texts';

  @query('input')
  private controlElement!: HTMLInputElement;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  handleInput() {
    this.value = this.controlElement.value;
    this.internals.setFormValue(this.value);
  }

  // This ensures our element always participates in the form
  // protected firstUpdated(_changedProperties: PropertyValues) {
  //   super.firstUpdated(_changedProperties);
  //   this.internals.setFormValue(this.value);
  // }

  // setFormValue()
  // setValidity();
  // validationMessage;
  // checkValidity();

  render() {
    return html`
      <div class="wrapper">
        <label>
          <slot name="label"></slot>
        </label>
        <div class="input-wrapper">
          <input
            value=${this.value}
            ?disabled=${this.disabled}
            @input=${this.handleInput}
            placeholder=${this.placeholder}
            type="text"
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
