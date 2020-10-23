/* eslint-env browser, mocha */
import { KaskadiElement, html } from 'https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-element/kaskadi-element.js'

import './elements/kaskadi-section.js'

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

  render () {
    return html`
      <h1>${this.title}</h1>
      <p>Current language is ${this.lang}</p>
      <kaskadi-section lang="${this.lang}">lorem ipsum but short</kaskadi-section>
    `
  }
}

customElements.define('kaskadi-custom-element', KaskadiCustomElement)
