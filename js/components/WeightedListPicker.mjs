import Button from "./Button.mjs";
import Paragraph from "./Paragraph.mjs";
import SectionTitle from "./SectionTitle.mjs";

/**
 * 
 * @param  {{name: string, weight: number}[]} items 
 */
export default function WeightedListPicker(title = "Weighted List Picker", items = []) {
    console.log(items);

    const section = document.createElement("section");
    section.dataset.type = "weighted-list-picker";
    const sectionTitle = SectionTitle(title);
    const itemsList = UnorderedList(...items);
    const picked = Paragraph("Picked item will appear here");
    const pickButton = Button("Pick Item", () => {picked.innerText = pickRandom(itemsList)});
    const addButton = Button("Add Item", () => addEmptyItem(itemsList));
    const removeButton = Button("Remove Section", () => {section.parentElement.removeChild(section)});
    
    section.appendChild(sectionTitle);
    section.appendChild(itemsList);
    section.appendChild(picked);
    section.appendChild(pickButton);
    section.appendChild(addButton);
    section.appendChild(removeButton);
    
    return section;
}

/**
 * 
 * @param {HTMLElement} section 
 */
export function serialize(section) {
    const data = [];
    const items = [];

    data.push(section.dataset.type, section.children[0].innerText, items);

    for (let li of section.children[1].children) {
        items.push({name: getName(li), weight: parseWeight(li)});
    }

    return data;
}

/**
 * 
 * @param  {...{name: string, weight: number}} items 
 */
function UnorderedList(...items) {
    const ul = document.createElement("ul");

    for (let {name, weight} of items) {
        ul.appendChild(ListItem(name, weight));
    }

    return ul;
}

function addEmptyItem(ul) {
    ul.appendChild(ListItem());
}

/**
 * 
 * @param {HTMLUListElement} ul 
 */
function pickRandom(ul) {
    const names = [...ul.children].map(li => getName(li));
    const weights = [...ul.children].map(li => parseWeight(li));
    const weightSum = weights.reduce((prev, cur) => prev + cur, 0);
    const random = Math.random() * weightSum
    
    for (let accumWeight = 0, i = 0; i < weights.length; i++) {
        const weight = weights[i];
        if (random >= accumWeight && random < accumWeight + weight) return names[i];
        accumWeight += weight; 
    }
}

function ListItem(name = "Item", weight = 0) {
    const li = document.createElement("li");
    const spanName = document.createElement("span");
    spanName.innerText = name;
    spanName.contentEditable = "true";
    const spanWeight = document.createElement("span");
    spanWeight.innerText = `${weight}`;
    spanWeight.contentEditable = "true";
    const removeButton = Button("X", () => {li.parentElement.removeChild(li)});

    li.appendChild(spanName);
    li.appendChild(spanWeight);
    li.appendChild(removeButton);
    return li;
}

function getName(li) {
    return li.firstChild.innerText;
}

function parseWeight(li) {
    return parseInt(li.children[1].innerText);
}