
export default function Title(content) {
    const h1 = document.createElement("h1");
    h1.innerText = content;
    h1.contentEditable = "true";
    return h1;
}