import Button from "../base/Button.mjs";
import Paragraph from "../base/Paragraph.mjs";
import SectionTitle from "./SectionTitle.mjs";

export default function RandomListPicker(title = "Random List Picker", content = "One item\nPer line\nlike this") {
    const section = document.createElement("section");
    const sectionTitle = SectionTitle(title);
    const list = Paragraph(content, true);
    const picked = Paragraph("The picked item will appear here");
    const pickButton = Button("Pick Item", () => {
        const items = list.innerText.split("\n").filter(item => item.length !== 0);
        const choosen = Math.floor(Math.random() * items.length)
        picked.innerText = `${items[choosen]}`;
    });
    const removeItemButton = Button("Remove Choosen", () => {
        const items = list.innerText.split("\n").filter(item => item.length !== 0);
        const choosen = picked.innerText;
        list.innerText = items.filter(item => item !== choosen).join("\n");
    });
    const removeSectionButton = Button("Remove Section", () => {section.parentElement.removeChild(section)});

    section.dataset.type = "random-list-picker";

    section.appendChild(sectionTitle);
    section.appendChild(list);
    section.appendChild(picked);
    section.appendChild(pickButton);
    section.appendChild(removeItemButton);
    section.appendChild(removeSectionButton);
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