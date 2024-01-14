const imgContainer = document.querySelector("div.Display")
const containerBox = imgContainer.getBoundingClientRect()
const containerBottom = containerBox.bottom
const containerLeft = containerBox.left

const img1 = document.getElementById("img_1")
const img1Box = img1.getBoundingClientRect()
const img1W = img1Box.width
const img1H = img1Box.height
const img2 = document.getElementById("img_2")
const img2Box = img1.getBoundingClientRect()
const img2W = img2Box.width
const img2H = img2Box.height

const control1 = document.getElementById("control_1")
const sizeInput1 = control1.children[2]
const control2 = document.getElementById("control_2")
const sizeInput2 = control2.children[2]

function adjustSizes() {
    console.log("hello")
    const size1 = parseInt(sizeInput1.innerText)
    const size2 = parseInt(sizeInput2.innerText)

    if (Number.isNaN(size1) || Number.isNaN(size2)) return
    if (size1 <= 0 || size2 <= 0) return

    if (size1 >= size2) {
        img1.style.height = `${img1H}px`
        img1.style.width = `${img1W}px`
        img2.style.height = `${img2H * (size2 / size1)}px`
        img2.style.width = `${img2W * (size2 / size1)}px`
    } else {
        img2.style.height = `${img2H}px`
        img2.style.width = `${img2W}px`
        img1.style.height = `${img1H * (size1 / size2)}px`
        img1.style.width = `${img1W * (size1 / size2)}px`
    }
}

/**
 * 
 * @param {HTMLImageElement} img 
 * @param {HTMLDivElement} control 
 */
function mountControls(img, control) {
    //////////////////////////////////
    // Image Controls
    //////////////////////////////////


    

    let isDragged = false
    let touchId = undefined
    let x = 0
    let y= 0
    let offsetBottom = 0
    let offsetLeft = 0

    img.addEventListener("mousedown", (e) => {
        const box = img.getBoundingClientRect()
        isDragged = true
        img.style.zIndex = "1"
        offsetBottom = box.bottom - containerBottom
        offsetLeft = box.left - containerLeft
        x = e.clientX
        y = e.clientY
    })

    img.addEventListener("mousemove", (e) => {
        if (isDragged) {
            img.style.bottom = `${offsetBottom + y - e.clientY}px`
            img.style.left = `${offsetLeft + e.clientX - x}px`
        }
    })

    img.addEventListener("mouseup", (e) => {
        isDragged = false
        img.style.zIndex = "auto"
    })

    img.addEventListener("touchstart", (e) => {
        e.preventDefault()
        if (touchId === undefined) {
            const box = img.getBoundingClientRect()
            const touch = e.changedTouches[0]
            touchId = touch.identifier
            img.style.zIndex = "1"
            offsetBottom = box.bottom - containerBottom
            offsetLeft = box.left - containerLeft
            x = touch.clientX
            y = touch.clientY
        }
    })

    img.addEventListener("touchmove", (e) => {
        console.log("touch move")
        const targetTouch = [...e.changedTouches].find((touch) => touch.identifier === touchId)
        if (targetTouch !== undefined) {
            img.style.bottom = `${offsetBottom + y - targetTouch.clientY}px`
            img.style.left = `${offsetLeft + targetTouch.clientX - x}px`
        }
    })

    img.addEventListener("touchend", (e) => {
        const targetTouch = [...e.changedTouches].find((touch) => touch.identifier === touchId)
        if (targetTouch !== undefined) {
            touchId = undefined
            img.style.zIndex = "auto"
        }
    })

    img.addEventListener("touchcancel", (e) => {
        const targetTouch = [...e.changedTouches].find((touch) => touch.identifier === touchId)
        if (targetTouch !== undefined) {
            touchId = undefined
            img.style.zIndex = "auto"
        }
    })


    //////////////////////////////////
    // Input Controls
    //////////////////////////////////

    const sizeInput = control.children[2]
    const imageInput = control.children[4]

    sizeInput.addEventListener("input", adjustSizes)

    imageInput.addEventListener("paste", (e) => {
        e.preventDefault()
        const file = e.clipboardData.files[0]
        const url = URL.createObjectURL(file)
        img.src = url
        img.addEventListener("load", () => URL.revokeObjectURL(url), {once: true})
    })
}

mountControls(img1, control1)
mountControls(img2, control2)