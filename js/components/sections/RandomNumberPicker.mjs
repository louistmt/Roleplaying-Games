import InputNumber, { getNumber } from "./InputNumber.mjs";
import Button from "../base/Button.mjs";
import Paragraph from "../base/Paragraph.mjs";
import SectionTitle from "./SectionTitle.mjs";

export default function RandomNumberPicker(title = "Random Number Picker", min = 0, max = 10) {
    const section = document.createElement("section");
    const sectionTitle = SectionTitle(title);
    const minInput = InputNumber("min", min);
    const maxInput = InputNumber("max", max);
    const display = Paragraph("The number will appear here");
    const pickButton = Button("Pick Number", () => {
        let min = 0, max = 0;
        try {
            min = getNumber(minInput);
            max = getNumber(maxInput);
        } catch (err) {
            display.innerText = "One of the values isn't a integer";
            return;
        }
        
        display.innerText = `${Math.floor(Math.random() * (max - min + 1)) + min}`;
    });
    const removeButton = Button("Remove Section", () => { section.parentElement.removeChild(section) });

    section.dataset.type = "random-number-picker";

    section.appendChild(sectionTitle);
    section.appendChild(minInput);
    section.appendChild(maxInput);
    section.appendChild(display);
    section.appendChild(pickButton);
    section.appendChild(removeButton);
    return section;
}

/**
 * 
 * @param {HTMLElement} section 
 * @returns 
 */
export function serialize(section) {
    return [
        section.dataset.type,
        section.children[0].innerText,
        getNumber(section.children[1]),
        getNumber(section.children[2])
    ]
}