
export default function InputNumber(label, value = 0) {
    const div = document.createElement("div");
    div.classList.add("input-container");

    const span = document.createElement("span");
    span.innerText = `${label}:`;

    const input = document.createElement("input");
    input.type = "number";
    input.value = `${value}`;
    input.step = "1";
    
    div.appendChild(span);
    div.appendChild(input);
    return div;
}

/**
 * 
 * @param {HTMLDivElement} div 
 */
export function getNumber(div) {
    return parseInt(div.children[1].value)
}