import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './ds-text-input.styles';

@customElement('ds-text-input')
export class DsTextInput extends LitElement {
  static styles = styles;
  @property({ type: String })
  value = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String, reflect: true })
  hierarchy = 'primary';

  @property({ type: String, reflect: true })
  size = 'md';

  @property({ type: String })
  placeholder = 'Input texts';

  _handleInput(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new InputEvent('input', { bubbles: true, composed: true })
    );
  }

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
            @input=${this._handleInput}
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
