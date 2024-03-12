import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ds-button')
export class DsButton extends LitElement {
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  hierarchy = 'primary';

  @property({ type: String, reflect: true })
  size = 'md';

  @property({ type: String, reflect: true })
  type = 'filled';

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="button" .tabIndex="${this.disabled ? -1 : 0}">
        <slot name="iconBefore"></slot>
        <slot></slot>
        <slot name="iconAfter"></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      font-family: 'Inter', sans-serif;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      outline: none;
    }

    :host .button {
      border-style: solid;
      border-width: 1px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    :host .button:focus-visible {
      outline: none !important;
    }

    :host([size='md']) .button {
      border-radius: 8px;
      font-size: 16px;
      padding: 12px 24px;
    }

    :host([size='sm']) .button {
      border-radius: 6px;
      font-size: 14px;
      padding: 8px 16px;
    }

    :host([hierarchy='primary'][type='filled']) .button {
      background: var(--ds-action-primary-surface);
      border-color: transparent;
      color: var(--ds-action-primary-text);
    }

    :host([hierarchy='primary'][type='filled']:hover) .button {
      background: var(--ds-action-primary-surface-hover);
    }

    :host([hierarchy='primary'][type='filled']:focus) .button {
      background: var(--ds-action-primary-surface-focus);
      border-color: var(--ds-action-primary-stroke-focus);
    }

    :host([hierarchy='primary'][type='filled'][disabled]) .button {
      background: var(--ds-action-primary-surface-disabled);
      color: var(--ds-action-primary-text-disabled);
    }

    :host([hierarchy='primary'][type='outlined']) .button {
      background: var(--ds-action-primary-surface-alternative);
      border-color: var(--ds-action-primary-stroke-alternative);
      color: var(--ds-action-primary-text-alternative);
    }

    :host([hierarchy='primary'][type='outlined']:hover) .button {
      background: var(--ds-action-primary-surface-hover-alternative);
      border-color: var(--ds-action-primary-stroke-hover-alternative);
      color: var(--ds-action-primary-text-hover-alternative);
    }

    :host([hierarchy='primary'][type='outlined']:focus) .button {
      background: var(--ds-action-primary-surface-focus-alternative);
      border-color: var(--ds-action-primary-stroke-focus-alternative);
      color: var(--ds-action-primary-text-focus-alternative);
    }

    :host([hierarchy='primary'][type='outlined'][disabled]) .button {
      background: var(--ds-action-primary-surface-disabled-alternative);
      border-color: var(--ds-action-primary-stroke-disabled-alternative);
      color: var(--ds-action-primary-text-disabled-alternative);
    }

    :host([hierarchy='secondary'][type='filled']) .button {
      background: var(--ds-action-secondary-surface);
      border-color: transparent;
      color: var(--ds-action-secondary-text);
    }

    :host([hierarchy='secondary'][type='filled']:hover) .button {
      background: var(--ds-action-secondary-surface-hover);
    }

    :host([hierarchy='secondary'][type='filled']:focus) .button {
      background: var(--ds-action-secondary-surface-focus);
      border-color: var(--ds-action-secondary-stroke-focus);
    }

    :host([hierarchy='secondary'][type='filled'][disabled]) .button {
      background: var(--ds-action-secondary-surface-disabled);
      color: var(--ds-action-secondary-text-disabled);
    }

    :host([hierarchy='secondary'][type='outlined']) .button {
      background: var(--ds-action-secondary-surface-alternative);
      border-color: var(--ds-action-secondary-stroke-alternative);
      color: var(--ds-action-secondary-text-alternative);
    }

    :host([hierarchy='secondary'][type='outlined']:hover) .button {
      background: var(--ds-action-secondary-surface-hover-alternative);
      border-color: var(--ds-action-secondary-stroke-hover-alternative);
      color: var(--ds-action-secondary-text-hover-alternative);
    }

    :host([hierarchy='secondary'][type='outlined']:focus) .button {
      background: var(--ds-action-secondary-surface-focus-alternative);
      border-color: var(--ds-action-secondary-stroke-focus-alternative);
      color: var(--ds-action-secondary-text-focus-alternative);
    }

    :host([hierarchy='secondary'][type='outlined'][disabled]) .button {
      background: var(--ds-action-secondary-surface-disabled-alternative);
      border-color: var(--ds-action-secondary-stroke-disabled-alternative);
      color: var(--ds-action-secondary-text-disabled-alternative);
    }
  `;
}
