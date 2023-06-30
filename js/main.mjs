import RandomListPicker, {serialize as listPickerSerialize} from "./components/RandomListPicker.mjs";
import RandomNumberPicker, {serialize as numberPickerSerialize} from "./components/RandomNumberPicker.mjs";
import WeightedListPicker, {serialize as weightedPickerSerialize} from "./components/WeightedListPicker.mjs";
import Button from "./components/Button.mjs";
import TextSection, {serialize as textSectionSerialize} from "./components/TextSection.mjs";
import Title from "./components/Title.mjs";

const main = document.querySelector("main");
const buttonSection = document.querySelector("section");

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") load();
    if (document.visibilityState === "hidden") save(); 
});

setInterval(save, 10000);

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
buttonSection.appendChild(Button("Clear All", () => {
    for (let child of [...main.children]) {
        main.removeChild(child);
    }
    main.appendChild(Title("Dungeon Run"));
}));

//
// Functions
//

/**
 * Save website state
 */
function save() {
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
    removeEventListener("beforeunload", warnUnsavedChanges);
    console.log("Dungeon run saved");
}

/**
 * Load website state
 */
function load() {
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
}