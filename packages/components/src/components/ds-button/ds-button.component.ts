import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './ds-button.styles';
import 'element-internals-polyfill';
import { ElementInternals } from 'element-internals-polyfill/dist/element-internals';

@customElement('ds-button')
export class DsButton extends LitElement {
  static styles = styles;
  private _internals: ElementInternals;

  // TODO: Add ARIA properties
  // - role: 'button'
  // - ariaLabel: string
  // - ariaDisabled: boolean
  // - click/keydown

  // Doesn't have to be exposed to component api
  // @property({ type: String, reflect: true })
  // ariaLabel = '';
  // @property({ type: String, reflect: true })
  // ariaDisabled: 'true' | 'false' = 'false';

  /**
   * Changes the button to a disabled state
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  /**
   * Changes the color styling of the button
   **/
  @property({ type: String, reflect: true })
  hierarchy: 'primary' | 'secondary' = 'primary';

  /**
   * Changes the sizing of the button
   */
  @property({ type: String, reflect: true })
  size: 'sm' | 'md' = 'md';

  /**
   * Changes the visual style of the button
   */
  @property({ type: String, reflect: true })
  type: 'filled' | 'outlined' = 'filled';

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'button';
    this._internals.ariaLabel = 'testLabel';
    this._internals.ariaDisabled = this.disabled ? 'true' : 'false';
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    if (_changedProperties.has('disabled')) {
      this._internals.ariaDisabled = this.disabled ? 'true' : 'false';
    }
  }

  updateLabel(event: Event) {
    const slotElement: HTMLSlotElement = event.target as HTMLSlotElement;
    console.log(slotElement);
  }

  render() {
    return html`
      <div class="container">
        <slot name="iconBefore"></slot>
        <slot @slotchange=${this.updateLabel}></slot>
        <slot name="iconAfter"></slot>
      </div>
    `;
  }
}
