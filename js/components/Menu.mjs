import { html } from "../lib/html.mjs";

/**
 * 
 * @param {[string, string][]} items Pairs of strings and links.
 */
export function Menu(items) {
    const menuItems = items.map(([name, link]) => html`
        <li>
            <a href="${link}">${name}</a>
        </li>
    `)

    return html`
        <nav class="Menu">
            <ul>
                ${menuItems}
            </ul>
        </nav>
    `
}