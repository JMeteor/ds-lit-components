import { css } from 'lit-element';

export const styles = css`
  :host {
    --button-padding-sm: 8px 16px;
    --button-padding-md: 12px 24px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    outline: none;
  }

  :host(:not([disabled])) .container {
    cursor: pointer;
  }

  :host([size='md']) .container {
    border-radius: 8px;
    font-size: 16px;
    padding: var(--button-padding-md);
  }

  :host([size='sm']) .container {
    border-radius: 6px;
    font-size: 14px;
    padding: var(--button-padding-sm);
  }

  :host .container {
    border-style: solid;
    border-width: 1px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  :host .container:focus-visible {
    outline: none !important;
  }

  :host([hierarchy='primary'][type='filled']) .container {
    background: var(--ds-action-primary-surface);
    border-color: transparent;
    color: var(--ds-action-primary-text);
  }

  :host([hierarchy='primary'][type='filled']:hover) .container {
    background: var(--ds-action-primary-surface-hover);
  }

  :host([hierarchy='primary'][type='filled']:focus) .container {
    background: var(--ds-action-primary-surface-focus);
    border-color: var(--ds-action-primary-stroke-focus);
  }

  :host([hierarchy='primary'][type='filled'][disabled]) .container {
    background: var(--ds-action-primary-surface-disabled);
    color: var(--ds-action-primary-text-disabled);
  }

  :host([hierarchy='primary'][type='outlined']) .container {
    background: var(--ds-action-primary-surface-alternative);
    border-color: var(--ds-action-primary-stroke-alternative);
    color: var(--ds-action-primary-text-alternative);
  }

  :host([hierarchy='primary'][type='outlined']:hover) .container {
    background: var(--ds-action-primary-surface-hover-alternative);
    border-color: var(--ds-action-primary-stroke-hover-alternative);
    color: var(--ds-action-primary-text-hover-alternative);
  }

  :host([hierarchy='primary'][type='outlined']:focus) .container {
    background: var(--ds-action-primary-surface-focus-alternative);
    border-color: var(--ds-action-primary-stroke-focus-alternative);
    color: var(--ds-action-primary-text-focus-alternative);
  }

  :host([hierarchy='primary'][type='outlined'][disabled]) .container {
    background: var(--ds-action-primary-surface-disabled-alternative);
    border-color: var(--ds-action-primary-stroke-disabled-alternative);
    color: var(--ds-action-primary-text-disabled-alternative);
  }

  :host([hierarchy='secondary'][type='filled']) .container {
    background: var(--ds-action-secondary-surface);
    border-color: transparent;
    color: var(--ds-action-secondary-text);
  }

  :host([hierarchy='secondary'][type='filled']:hover) .container {
    background: var(--ds-action-secondary-surface-hover);
  }

  :host([hierarchy='secondary'][type='filled']:focus) .container {
    background: var(--ds-action-secondary-surface-focus);
    border-color: var(--ds-action-secondary-stroke-focus);
  }

  :host([hierarchy='secondary'][type='filled'][disabled]) .container {
    background: var(--ds-action-secondary-surface-disabled);
    color: var(--ds-action-secondary-text-disabled);
  }

  :host([hierarchy='secondary'][type='outlined']) .container {
    background: var(--ds-action-secondary-surface-alternative);
    border-color: var(--ds-action-secondary-stroke-alternative);
    color: var(--ds-action-secondary-text-alternative);
  }

  :host([hierarchy='secondary'][type='outlined']:hover) .container {
    background: var(--ds-action-secondary-surface-hover-alternative);
    border-color: var(--ds-action-secondary-stroke-hover-alternative);
    color: var(--ds-action-secondary-text-hover-alternative);
  }

  :host([hierarchy='secondary'][type='outlined']:focus) .container {
    background: var(--ds-action-secondary-surface-focus-alternative);
    border-color: var(--ds-action-secondary-stroke-focus-alternative);
    color: var(--ds-action-secondary-text-focus-alternative);
  }

  :host([hierarchy='secondary'][type='outlined'][disabled]) .container {
    background: var(--ds-action-secondary-surface-disabled-alternative);
    border-color: var(--ds-action-secondary-stroke-disabled-alternative);
    color: var(--ds-action-secondary-text-disabled-alternative);
  }
`;
