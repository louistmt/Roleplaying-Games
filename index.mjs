import { Menu } from "./js/components/Menu.mjs";

document.body.append(
    Menu([
        ["Old Page", "/old-page/index.html",],
        ["Ascii Map Editor", "/pages/ascii-map-editor/page.html"]
    ])
)