/* eslint-env browser, mocha */
import { KaskadiElement, html, css } from 'https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-element/kaskadi-element.js'

/**
 * Template element for the Kaskadi application
 *
 * @module kaskadi-custom-element
 *
 * @param {string} lang - element's language
 * @param {string} title - element's title
 *
 * @example
 *
 * <kaskadi-custom-element title="Welcome!" lang="en"></kaskadi-custom-element>
 */

class KaskadiCustomElement extends KaskadiElement {
  static get properties () {
    return {
      lang: { type: String },
      title: { type: String }
    }
  }

  // this styles comes from kaskadi-date-icon. It doesn't make much sense here but it's for test only
  static get styles () {
    return css`
      :host, svg{
        --icon-size: 56px;
        width:var(--icon-size, 48px);
        height:var(--icon-size, 48px);
        display: inline-block;
      }
      #bg { fill: var(--background-color, white) }
      #outline { stroke: var(--outline-color, #333) }
      #head { fill: var(--head-color, royalblue) }
      #day { fill: var(--day-color, var(--outline-color, #333)) }
      #monat { fill: var(--month-color, white) }
      #name { fill: var(--name-color, var(--outline-color, #333)) }

    `
  }

  render () {
    return html`
      <h1>${this.title}</h1>
      <p>Current language is ${this.lang}</p>
    `
  }
}

customElements.define('kaskadi-custom-element', KaskadiCustomElement)
