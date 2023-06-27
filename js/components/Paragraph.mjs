
export default function Paragraph(content, editable = false) {
    const p = document.createElement("p");
    p.innerText = content;
    p.contentEditable = editable ? "true" : "false";
    return p;
}