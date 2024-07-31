import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './ds-button.styles';

@customElement('ds-button')
export class DsButton extends LitElement {
  static styles = styles;

  /**
   * Changes the button to a disabled state
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  /**
   * Changes the color styling of the button
   */
  @property({ type: String, reflect: true })
  hierarchy: 'primary' | 'secondary' = 'primary';

  /**
   * Changes the sizing of the button
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' = 'md';

  /**
   * Changes the type of button
   */
  @property({ type: String, reflect: true })
  type: 'filled' | 'outlined' = 'filled';

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="container" .tabIndex="${this.disabled ? -1 : 0}">
        <slot name="iconBefore"></slot>
        <slot></slot>
        <slot name="iconAfter"></slot>
      </div>
    `;
  }
}
