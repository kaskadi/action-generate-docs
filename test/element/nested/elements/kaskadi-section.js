/* eslint-env browser, mocha */
import { KaskadiElement, html } from 'https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-element/kaskadi-element.js'

/**
 * Template element for the Kaskadi application
 *
 * @module kaskadi-section
 *
 * @param {string} lang - element's language
 *
 * @example
 *
 * <kaskadi-section lang="en">lorem ipsum but short</kaskadi-section>
 */

class KaskadiSection extends KaskadiElement {
  static get properties () {
    return {
      lang: { type: String }
    }
  }

  render () {
    return html`
      <p>Current language is ${this.lang}</p>
      <slot></slot>
    `
  }
}

customElements.define('kaskadi-section', KaskadiSection)
