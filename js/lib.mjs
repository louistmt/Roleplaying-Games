
/**
 * Tag function that renders html into Dom Elements.
 * It also does a little work behind the scenes like
 * setting manually attributes and event listeners.
 * Don't pass the value "${}".
 * This is used by the function to know where to place the values.
 * @param {strings[]} strings 
 * @param  {...any} values 
 */
export function html(strings, ...values) {
    // Temporary container to turn html string into Dom Elements.
    const tempEle = document.createElement("div")
    
    // Render the html.
    tempEle.innerHTML = strings.join("${}")
    let element = tempEle.children[0]

    // Loop recursively through the element and its children
    // and replace all the $index values in their properties
    // with the correct values
    let stack = [element]
    let idx = 0
    while (stack.length > 0) {
        const e = stack.pop()
        const attributes = [...e.attributes]

        // Set all the attributes manually but ensure
        // event attributes are set with addEventListener
        for (let attr of attributes) {
            if (attr.name.startsWith("on") && attr.value == "${}" && values[idx] instanceof Function) {
                e.addEventListener(attr.name.replace("on", ""), values[idx])
                e.removeAttribute(attr.name)
                idx++
            }

            // We need to replace all instances of ${}
            // with the corresponding values
            if (!attr.name.startsWith("on") && attr.value.includes("${}")) {
                e.setAttribute(attr.name, attr.value.replaceAll("${}", (match) => {
                    const value = values[idx]
                    idx++
                    return String(value)
                }))
            }
        }

        // Loop through the child nodes and check what they are
        for (let node of [...e.childNodes]) {
            // Process this in the next top loop
            if (node.nodeType == Node.ELEMENT_NODE) {
                stack.push(node)
                continue
            }

            // If its a text node we need to replace its contents
            if (node.nodeType == Node.TEXT_NODE && node.textContent !== null) {
                const newNodes = []
                const nextSibbling = node.nextSibling
                const splitText = node.textContent.split("${}")
                const split = splitText.slice(0, splitText.length - 1)
                const end = splitText[splitText.length - 1]
                if (split.length == 0) continue
                
                // Create text nodes for the strings in the "split" list
                // and create nodes for the values
                for (let t of split) {
                    newNodes.push(document.createTextNode(t))

                    // Values may have an Element, an array or any other value
                    // For the first case just append it to the list of newNodes
                    // For the second case iterate through the array
                    // For the third just append a text node with values[idx]
                    // as a string.
                    if (values[idx] instanceof Element) {
                        newNodes.push(values[idx])
                    } else if (Array.isArray(values[idx])) {
                        for (let v of values[idx]) {
                            if (v instanceof Element) {
                                newNodes.push(values[idx])
                            } else {
                                newNodes.push(document.createTextNode(values[idx]))
                            }
                        }
                    } else {
                        newNodes.push(document.createTextNode(values[idx]))
                    }

                    idx++
                }
                // Push the last text node.
                newNodes.push(document.createTextNode(end))

                // Apply updates to the element
                e.removeChild(node)
                for (let child of newNodes) {
                    e.insertBefore(child, nextSibbling)
                }
            }
        }
    }

    return element;
}