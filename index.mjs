import { Menu } from "./js/components/Menu.mjs";



document.body.append(
    Menu([
        ["Old Page", (new URL("/old-page/index.html", window.location.href)).href],
        ["Ascii Map Editor", (new URL("/pages/ascii-map-editor/page.html", window.location.href)).href]
    ])
)