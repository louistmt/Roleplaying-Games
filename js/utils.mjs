/**
 * @returns {Promise<string>}
 */
export function requesTextFile() {
    return new Promise((resolve, reject) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".txt";

        input.addEventListener("change", (changeEvent) => {
            if (input.files.length !== 1) reject("One and only one input file required");

            const reader = new FileReader();
            reader.addEventListener("load", (loadEvent) => {
                resolve(loadEvent.target.result)
            }, { once: true });
            reader.readAsText(input.files[0]);

        }, { once: true });

        input.click();
    });
}


/**
 * 
 * @param {string} filename
 * @param {string} data 
 */
export function downloadTextFile(filename, data) {
    return new Promise((resolve, reject) => {
        const blob = new Blob([data], {type: "text/plain"});
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
    })
}