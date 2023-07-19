import Modal from "./Modal.mjs";
import Button from "../base/Button.mjs";

/**
 * 
 * @param {string} title 
 * @param {string} question
 * @param {() => void} yesCallback 
 * @param {() => void} noCallback 
 * @returns {[HTMLDialogElement, () => void]}
 */
export default function ConfirmationModal(title, question, yesCallback, noCallback = () => {}) {
    const [base, show, hide] = Modal();
    const titleElement = document.createElement("h1");
    const actionElement = document.createElement("p");
    const yesButton = Button("Yes", () => {
        hide(); 
        yesCallback();
        base.parentElement.removeChild(base);
    });
    const noButton = Button("No", () => {
        hide(); 
        noCallback();
        base.parentElement.removeChild(base);
    });

    titleElement.innerText = title;
    actionElement.innerText = question;
    
    base.classList.add("confirmation");
    base.appendChild(titleElement);
    base.appendChild(actionElement);
    base.appendChild(yesButton);
    base.appendChild(noButton);
    return [base, show];
}