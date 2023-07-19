import Button from "../base/Button.mjs";
import Paragraph from "../base/Paragraph.mjs";
import SectionTitle from "./SectionTitle.mjs";

export default function TextSection(title = "Text Section", content = "") {
    const section = document.createElement("section");
    const sectionTitle = SectionTitle(title);
    const paragraph = Paragraph(content, true);
    const button = Button("Remove Section", () => {section.parentElement.removeChild(section)});

    section.dataset.type = "text-section";

    section.appendChild(sectionTitle);
    section.appendChild(paragraph);
    section.appendChild(button);
    return section;
}

/**
 * 
 * @param {HTMLElement} section 
 */
export function serialize(section) {
    return [
        section.dataset.type,
        section.children[0].innerText,
        section.children[1].innerText
    ];
}