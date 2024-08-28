import { css } from 'lit';

export const styles = css`
  :host {
    font-family: 'Inter', sans-serif;
  }

  :host .wrapper {
    display: inline-flex;
    flex-direction: column;
  }

  :host label {
    display: block;
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 4px;
  }

  :host input {
    box-sizing: border-box;
    border-radius: 8px;
    border-style: solid;
    border-width: 1px;
    color: black;
    font-size: 16px;
    min-width: 200px;
    height: 40px;
    padding: 10px 16px;
  }

  .input-wrapper {
    position: relative;
  }

  .input-wrapper ::slotted([slot='iconRight']) {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }

  :host([hierarchy='primary']) ::slotted([slot='iconRight']) {
    stroke: var(--ds-input-primary-icon);
  }

  :host([hierarchy='primary'][disabled]) ::slotted([slot='iconRight']) {
    stroke: var(--ds-input-primary-icon-disabled);
  }

  :host([hierarchy='secondary']) ::slotted([slot='iconRight']) {
    stroke: var(--ds-input-secondary-icon);
  }

  :host([hierarchy='secondary'][disabled]) ::slotted([slot='iconRight']) {
    stroke: var(--ds-input-secondary-icon-disabled);
  }

  :host([hierarchy='primary']) label {
    color: var(--ds-input-primary-label);
  }
  :host([hierarchy='primary']) input {
    border-color: var(--ds-input-primary-stroke);
    color: var(--ds-input-primary-text);
  }
  :host([hierarchy='primary']) input::placeholder {
    color: var(--ds-input-primary-placeholder);
  }
  :host([hierarchy='primary']) .hint {
    color: var(--ds-feedback-primary-hint);
  }
  :host([hierarchy='primary'][disabled]) label {
    color: var(--ds-input-primary-label-disabled);
  }
  :host([hierarchy='primary'][disabled]) input {
    border-color: var(--ds-input-primary-stroke-disabled);
    color: var(--ds-input-primary-text-disabled);
  }
  :host([hierarchy='primary'][disabled]) .hint {
    color: var(--ds-feedback-primary-hint-disabled);
  }

  :host([hierarchy='secondary']) label {
    color: var(--ds-input-secondary-label);
  }
  :host([hierarchy='secondary']) input {
    border-color: var(--ds-input-secondary-stroke);
    color: var(--ds-input-secondary-text);
  }
  :host([hierarchy='secondary']) input::placeholder {
    color: var(--ds-input-secondary-placeholder);
  }
  :host([hierarchy='secondary']) .hint {
    color: var(--ds-feedback-secondary-hint);
  }
  :host([hierarchy='secondary'][disabled]) label {
    color: var(--ds-input-secondary-label-disabled);
  }
  :host([hierarchy='secondary'][disabled]) input {
    border-color: var(--ds-input-secondary-stroke-disabled);
    color: var(--ds-input-secondary-text-disabled);
  }
  :host([hierarchy='secondary'][disabled]) .hint {
    color: var(--ds-feedback-secondary-hint-disabled);
  }

  :host([size='sm']) input {
    height: 32px;
  }

  :host([error]) input {
    border-color: var(--ds-input-danger-stroke);
  }

  .helperText {
    display: block;
    font-size: 12px;
    margin: 4px 0 0 0;
  }

  .error {
    color: var(--ds-feedback-danger-hint);
  }
`;
