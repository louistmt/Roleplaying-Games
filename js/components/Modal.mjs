
/**
 * 
 * @returns {[HTMLDialogElement, () => void, () => void]}
 */
export default function Modal() {
    const dialog = document.createElement("dialog");
    dialog.classList.add("modal");

    const showModal = (children) => dialog.showModal()

    const hideModal = () => dialog.close()

    return [dialog, showModal, hideModal];
}