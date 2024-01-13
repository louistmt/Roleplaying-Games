
export default function Button(content, callback = () => {}) {
    const button = document.createElement("button");
    button.innerText = content;
    button.addEventListener("click", callback);
    return button;
}