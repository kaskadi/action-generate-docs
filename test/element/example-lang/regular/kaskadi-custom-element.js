/* eslint-env browser, mocha */
import { KaskadiElement, html } from 'https://cdn.klimapartner.net/modules/@kaskadi/kaskadi-element/kaskadi-element.js'

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
 * console.log('Hello!')
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
    `
  }
}

customElements.define('kaskadi-custom-element', KaskadiCustomElement)
