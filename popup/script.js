
let body = document.getElementsByTagName("body")[0],
    config = document.getElementById("config"),
    container = document.getElementById("container"),
    text = document.getElementById("text"),
    input = document.getElementById("input"),
    button = document.getElementById("button")

// use `url` here inside the callback because it's asynchronous!
chrome.tabs.query ({active: true, lastFocusedWindow: true}, tabs => { 
    chrome.storage.sync.get(null, function(items) {
        const getShortcut = () => {
            let shortcutHasUrl
            for (key in items) {
                if (key == input.value) {
                    shortcutHasUrl = true
                }
            }
            if (shortcutHasUrl) {
                shortcutIsTaken()
            } else {
                chrome.storage.sync.set(
                    {[input.value]: tabs[0].url}, shortuctAdded()
                )
            }
        }
        let urlHasShortcut
        for (key in items) {
            if (items[key] == tabs[0].url) {
                urlHasShortcut = [true, key]
            }
        }
        if (urlHasShortcut) {
            showShortcut(urlHasShortcut[1])
        } else {
            container.classList.remove("hidden")
            button.addEventListener("click", getShortcut)
        } 
    })
})

const shortuctAdded = () => {
    text.innerText = "Site with shortcut"
    text.classList.remove("soft-coral")
    text.classList.add("soft-cyan")
    button.innerText = "Shortcut added"
    button.classList.remove("coral")
    button.classList.add("cyan")
}

const showShortcut = value => {
    let p = document.createElement("p"),
        shortcut = document.createElement("p")
    p.innerText = "This site has already a shortcut:"
    p.classList.add("shortcut-is-added_text")
    shortcut.innerText = value
    shortcut.classList.add("shortcut")
    config.classList.remove("right")
    config.classList.add("center")
    body.appendChild(p)
    body.appendChild(shortcut)
}

const shortcutIsTaken = () => {
    text.innerText = "Shortcut is taken"
    text.classList.remove("soft-coral")
    text.classList.add("red-text")
    button.innerText = "Error"
    button.classList.remove("coral")
    button.classList.add("red")
    input.classList.add("red-input")
}