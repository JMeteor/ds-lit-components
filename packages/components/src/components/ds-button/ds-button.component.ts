import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './ds-button.styles';
import 'element-internals-polyfill';
import { ElementInternals } from 'element-internals-polyfill/dist/element-internals';

@customElement('ds-button')
export class DsButton extends LitElement {
  static styles = styles;
  static formAssociated = true;
  private _internals: ElementInternals;

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
   * Enables form submission on click
   */
  @property({ type: Boolean, reflect: true })
  submit: boolean = false;

  /**
   * Changes the visual style of the button
   */
  @property({ type: String, reflect: true })
  type: 'filled' | 'outlined' = 'filled';

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._internals.role = 'button';
    this.tabIndex = 0;
  }

  private updateAriaLabel(slotElement: HTMLSlotElement) {
    const assignedNodes = slotElement.assignedNodes({ flatten: true });

    const textContent = assignedNodes
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent)
      .join('')
      .trim();

    if (textContent) {
      this._internals.ariaLabel = textContent;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this._internals.ariaDisabled = this.disabled ? 'true' : 'false';

    const slotElement = this.shadowRoot?.querySelector(
      'slot:not([name])'
    ) as HTMLSlotElement;
    if (slotElement) {
      this.updateAriaLabel(slotElement);
    }

    this.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    if (_changedProperties.has('disabled')) {
      this._internals.ariaDisabled = this.disabled ? 'true' : 'false';
    }
  }

  handleSlotChange(event: Event) {
    const slotElement: HTMLSlotElement = event.target as HTMLSlotElement;
    this.updateAriaLabel(slotElement);
  }

  private handleClick() {
    if (this.submit && !this.disabled) {
      const form = this.closest('form');
      if (form) {
        const submitEvent = new SubmitEvent('submit', {
          cancelable: true,
          bubbles: true,
        });
        form.dispatchEvent(submitEvent);

        if (!submitEvent.defaultPrevented) {
          form.submit();
        }
      }
    }
  }

  // should I use event .key or .code???
  private handleKeyDown(event: KeyboardEvent) {
    if (
      this.submit &&
      !this.disabled &&
      (event.code === 'Enter' || event.code === 'Space')
    ) {
      event.preventDefault();
      this.click();
    }
  }

  render() {
    return html`
      <div class="container">
        <slot name="iconBefore"></slot>
        <slot @slotchange=${this.handleSlotChange}></slot>
        <slot name="iconAfter"></slot>
      </div>
    `;
  }
}
