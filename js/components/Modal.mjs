
/**
 * 
 * @returns {[HTMLDialogElement, () => void, () => void]}
 */
export default function Modal() {
    const dialog = document.createElement("dialog");
    dialog.classList.add("modal");

    const showModal = (children) => {
        for (let child of children) {
            dialog.appendChild(child)
        }

        dialog.showModal();
    }

    const hideModal = () => {
        dialog.close();

        for (let child of dialog.children) {
            dialog.removeChild(child);
        }
    }

    return [dialog, showModal, hideModal];
}