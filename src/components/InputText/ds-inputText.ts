import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

@customElement('ds-input-text')
export class DsInputText extends LitElement {
  @property({ type: String })
  value = ''

  @property({ type: String })
  size = 'md'

  @property({ type: String })
  hierarchy = 'primary'

  @property({ type: Boolean })
  showLabel = false

  @property({ type: Boolean })
  showHint = false

  @property({ type: Boolean })
  showIcon = true

  @property({ type: Boolean })
  showError = true

  @property({ type: Boolean, reflect: true })
  disabled = false

  @property({ type: String })
  placeholder = 'Input texts'

  _handleInput(event: InputEvent) {
    const target = event.target as HTMLInputElement
    this.value = target.value
    this.dispatchEvent(
      new InputEvent('input', { bubbles: true, composed: true })
    )
  }

  _iconColor() {
    if (this.showError) {
      return 'var(--base-error)'
    }
    if (this.hierarchy === 'secondary' && this.disabled) {
      return 'var(--secondary-300)'
    }
    if (this.hierarchy === 'secondary') {
      return 'var(--secondary-700)'
    }
    if (this.disabled) {
      return 'var(--primary-300)'
    }
    return 'var(--primary-700)'
  }

  render() {
    const classes = {
      inputText: true,
      'inputText--md': this.size === 'md',
      'inputText--sm': this.size === 'sm',
      'inputText--primary': this.hierarchy === 'primary',
      'inputText--secondary': this.hierarchy === 'secondary',
      'inputText--disabled': this.disabled,
      'inputText--error': this.showError,
    }

    return html`
      <div class=${classMap(classes)}>
        ${this.showLabel
          ? html`<label class="inputText_label"
              ><slot name="label"></slot
            ></label>`
          : ''}
        <div class="inputText_wrapper">
          <input
            class="inputText_input"
            value=${this.value}
            ?disabled=${this.disabled}
            @input=${this._handleInput}
            placeholder=${this.placeholder}
            type="text"
          />
          ${this.showIcon
            ? html` <ds-icon
                .size=${this.size}
                .name=${'info-circle'}
                .color=${this._iconColor()}
              ></ds-icon>`
            : ''}
        </div>
        ${this.showError
          ? html`<p class="inputText_error"><slot name="error"></slot></p>`
          : this.showHint
          ? html`<p class="inputText_hint"><slot name="hint"></slot></p>`
          : ''}
      </div>
    `
  }

  static styles = css`
    .inputText {
      font-family: var(--font-inter);
    }
    .inputText_wrapper {
      display: inline-flex;
      align-items: center;
      position: relative;
    }
    .inputText_label {
      color: var(--primary-700);
      display: block;
      font-size: 14px;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 4px;
    }
    .inputText_input {
      box-sizing: border-box;
      border-color: var(--primary-700);
      border-radius: 8px;
      border-style: solid;
      border-width: 1px;
      color: black;
      font-size: 16px;
      min-width: 200px;
      height: 40px;
      padding: 10px 16px;
      &::placeholder {
        color: var(--primary-300);
      }
      &:focus {
        outline: none;
      }
    }
    .inputText_hint,
    .inputText_error {
      display: block;
      font-size: 12px;
      margin: 4px 0 0 0;
    }
    .inputText_hint {
      color: var(--primary-500);
    }
    .inputText_error {
      color: var(--base-error);
    }

    ds-icon {
      position: absolute;
      right: 16px;
    }

    .inputText {
      &.inputText--primary {
        & .inputText_label {
          color: var(--primary-700);
        }
        & .inputText_hint {
          color: var(--primary-500);
        }
      }
      &.inputText--disabled {
        & .inputText_label {
          color: var(--primary-300);
        }
        & .inputText_input {
          border-color: var(--primary-300);
          color: var(--primary-300);
          &::placeholder {
            color: var(--primary-300);
          }
        }
        & .inputText_hint {
          color: var(--primary-300);
        }
      }
      &.inputText--secondary {
        & .inputText_label {
          color: var(--secondary-700);
        }
        & .inputText_input {
          border-color: var(--secondary-700);
          &::placeholder {
            color: var(--secondary-500);
          }
        }
        & .inputText_hint {
          color: var(--secondary-500);
        }
        &.inputText--disabled {
          & .inputText_label {
            color: var(--secondary-300);
          }
          & .inputText_input {
            border-color: var(--secondary-500);
            &::placeholder {
              color: var(--secondary-300);
            }
          }
          & .inputText_hint {
            color: var(--secondary-300);
          }
        }
      }
      &.inputText--sm {
        & .inputText_input {
          height: 32px;
        }
      }
      &.inputText--error {
        & .inputText_hint {
          color: var(--base-error);
        }
        & .inputText_input {
          border-color: var(--base-error);
        }
      }
    }
  `
}
