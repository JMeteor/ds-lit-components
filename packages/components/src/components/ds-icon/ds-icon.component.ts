import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styles } from './ds-icon.styles.ts';

const icons: { [key: string]: string } = {
  'chevron-down': `
    <path d="M19 9.5L12 16.5L5 9.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  'chevron-down-sm': `
    <path d="M12.6667 6.5L8.00001 11.1667L3.33334 6.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
   `,
  'info-circle': `
    <path d="M13.1672 16.1146L12.1672 16.1251L12.1253 12.1253L11.1253 12.1358M12.0833 8.12549L12.0933 8.12539M21.1248 12.0308C21.1372 13.2127 20.9167 14.3854 20.4759 15.482C20.0351 16.5786 19.3826 17.5776 18.5557 18.4221C17.7288 19.2665 16.7436 19.9399 15.6565 20.4036C14.5694 20.8673 13.4015 21.1124 12.2197 21.1248C11.0379 21.1372 9.86518 20.9167 8.76857 20.4759C7.67195 20.0351 6.67289 19.3826 5.82844 18.5557C4.98399 17.7288 4.31068 16.7436 3.84695 15.6565C3.38323 14.5694 3.13817 13.4016 3.12576 12.2197C3.10071 9.83291 4.02485 7.5339 5.69487 5.82845C7.36489 4.123 9.644 3.15082 12.0308 3.12577C14.4176 3.10072 16.7166 4.02485 18.4221 5.69488C20.1275 7.3649 21.0997 9.64401 21.1248 12.0308Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
   `,
  'info-circle-sm': `
   <path d="M8.88863 10.9861L8.22211 11.0001L8.16614 8.33405L7.49962 8.34805M8.11017 5.66798L8.11684 5.66784M14.1648 8.20813C14.1814 8.99589 14.0426 9.77919 13.7564 10.5133C13.4702 11.2474 13.0422 11.918 12.4969 12.4867C11.9516 13.0554 11.2995 13.5112 10.5781 13.8279C9.85661 14.1447 9.07982 14.3162 8.29207 14.3327C7.50431 14.3493 6.72101 14.2105 5.98689 13.9243C5.25277 13.6381 4.5822 13.2101 4.01348 12.6648C3.44476 12.1195 2.98901 11.4675 2.67227 10.746C2.35553 10.0245 2.184 9.24774 2.16746 8.45998C2.13406 6.86903 2.73404 5.32998 3.83539 4.18139C4.93674 3.03281 6.44926 2.36877 8.04021 2.33538C9.63116 2.30198 11.1702 2.90195 12.3188 4.0033C13.4674 5.10466 14.1314 6.61718 14.1648 8.20813Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
   `,
};

@customElement('ds-icon')
export class DsIcon extends LitElement {
  static styles = styles;
  @property({ type: String })
  size = 'md';

  @property({ type: String })
  name = '';

  private _svgContent = '';

  private loadSVG() {
    switch (this.name) {
      case 'chevron-down':
        this._svgContent =
          icons[`chevron-down${this.size === 'sm' ? '-sm' : ''}`];
        break;
      case 'info-circle':
        this._svgContent =
          icons[`info-circle${this.size === 'sm' ? '-sm' : ''}`];
        break;
      default:
        this._svgContent = '';
    }
  }

  protected willUpdate(_changedProperties: PropertyValues) {
    if (_changedProperties.has('name') || _changedProperties.has('size')) {
      this.loadSVG();
    }
  }

  render() {
    const classes = {
      icon: true,
      [`icon--${this.size}`]: ['md', 'sm'].includes(this.size),
    };

    const viewBox = this.size === 'sm' ? '0 0 16 16' : '0 0 24 24';

    return html` <svg
      class=${classMap(classes)}
      viewBox=${viewBox}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      .innerHTML=${this._svgContent}
    ></svg>`;
  }
}
