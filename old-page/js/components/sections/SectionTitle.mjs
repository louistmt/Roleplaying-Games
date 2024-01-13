
export default function SectionTitle(content) {
    const h2 = document.createElement("h2");
    h2.innerText = content;
    h2.contentEditable = "true";
    return h2;
}