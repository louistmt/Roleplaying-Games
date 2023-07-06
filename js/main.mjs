import RandomListPicker, { serialize as listPickerSerialize } from "./components/RandomListPicker.mjs";
import RandomNumberPicker, { serialize as numberPickerSerialize } from "./components/RandomNumberPicker.mjs";
import WeightedListPicker, { serialize as weightedPickerSerialize } from "./components/WeightedListPicker.mjs";
import Button from "./components/Button.mjs";
import TextSection, { serialize as textSectionSerialize } from "./components/TextSection.mjs";
import Title from "./components/Title.mjs";
import { downloadTextFile, requestTextFile } from "./utils.mjs";
import ConfirmationModal from "./components/ConfirmationModal.mjs";

const body = document.body;
const main = document.querySelector("main");
const buttonSection = document.querySelector("section");

// Add event listeners to save and load page state
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") load();
    if (document.visibilityState === "hidden") save();
});

// Auto save in intervals of 10 seconds just in case
setInterval(save, 10000);

// Add the modals after the 

// Attach events to the buttons
buttonSection.appendChild(Button("Save Run", save));
buttonSection.appendChild(Button("Add Section Text", () => {
    main.appendChild(TextSection());
}));
buttonSection.appendChild(Button("Add Number Picker", () => {
    main.appendChild(RandomNumberPicker());
}));
buttonSection.appendChild(Button("Add List Picker", () => {
    main.appendChild(RandomListPicker());
}));
buttonSection.appendChild(Button("Add Weighted Picker", () => {
    main.appendChild(WeightedListPicker());
}));
buttonSection.appendChild(Button("Import File...", () => {
    const [modal, show] = ConfirmationModal(
        "Import File",
        "Are you sure you wish to import the file? This will override the current run",
        async () => {
            const data = await requestTextFile();
            localStorage.setItem("saved-dungeon", data);
            load();
        }
    )

    body.appendChild(modal)
    show()
}));
buttonSection.appendChild(Button("Export File...", async () => {
    save();
    const data = localStorage.getItem("saved-dungeon");
    const title = JSON.parse(data)[0];
    await downloadTextFile(`${title}.txt`, data);
}));
buttonSection.appendChild(Button("Clear All", () => {
    const [modal, show] = ConfirmationModal(
        "Clear All",
        "Are you sure you want to clear everything. This action is irreversible",
        () => {
            localStorage.removeItem("saved-dungeon");

            for (let child of [...main.children]) {
                main.removeChild(child);
            }
            main.appendChild(Title("Dungeon Run"));
        }
    );

    body.appendChild(modal);
    show();
}));

load();

// const dialog = document.querySelector("dialog.modal");
// dialog.showModal();

//
// Functions
//

/**
 * Save website state
 */
function save() {
    console.log("Saving...");

    const [title, ...sections] = main.children;
    const data = []
    const sectionData = []

    data.push(title.innerText, sectionData);

    for (let section of sections) {
        const sectionType = section.dataset.type;
        switch (sectionType) {
            case "text-section":
                sectionData.push(textSectionSerialize(section));
                break;
            case "random-list-picker":
                sectionData.push(listPickerSerialize(section));
                break;
            case "random-number-picker":
                sectionData.push(numberPickerSerialize(section));
                break;
            case "weighted-list-picker":
                sectionData.push(weightedPickerSerialize(section));
                break;
            default:
                console.log("Unknown type:", sectionType, sectionData);
        }
    }

    localStorage.setItem("saved-dungeon", JSON.stringify(data));
    console.log("Dungeon run saved");
}

/**
 * Load website state
 */
function load() {
    console.log("Loading...");

    // Clear the children just in case
    while (main.children.length > 0) {
        main.removeChild(main.firstChild);
    }

    if (localStorage.getItem("saved-dungeon") !== null) {
        const data = JSON.parse(localStorage.getItem("saved-dungeon"));
        const [title, sections] = data;

        main.appendChild(Title(title));

        for (let section of sections) {
            const [sectionType, ...sectionData] = section;

            console.log(sectionData);

            switch (sectionType) {
                case "text-section":
                    main.appendChild(TextSection(...sectionData));
                    break;
                case "random-list-picker":
                    main.appendChild(RandomListPicker(...sectionData));
                    break;
                case "random-number-picker":
                    main.appendChild(RandomNumberPicker(...sectionData));
                    break;
                case "weighted-list-picker":
                    main.appendChild(WeightedListPicker(...sectionData));
                    break;
                default:
                    console.log("Unknown type:", sectionType, sectionData);
            }
        }
    } else {
        main.appendChild(Title("Dungeon Run"));
    }

    console.log("Loaded");
}