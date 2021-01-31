let container = document.getElementById("container"),
    year = document.getElementById("year"). innerText = new Date().getFullYear();

chrome.storage.sync.get(null, function(items) {
    for (key in items) {
        addRow(key, items[key])
    }
})

const addRow = (key, value) => {
    let row = document.createElement("div"),
        shortcut = document.createElement("input"),
        url = document.createElement("input"),
        img = document.createElement("img")
    row.classList.add("row")
    shortcut.classList.add("shortcut")
    url.classList.add("url")
    img.classList.add("icon")
    shortcut.value = key
    shortcut.disabled = true
    url.value = value
    url.disabled = true
    img.src = "../assets/icons/trash-alt-solid.svg"
    img.addEventListener("click", removeShortcut)
    row.appendChild(shortcut)
    row.appendChild(url)
    row.appendChild(img)
    container.appendChild(row)
}

const removeShortcut = event => {
    let row = event.target.parentElement.childNodes
    chrome.storage.sync.remove(row[0].value, function() {
        event.target.parentElement.style.display = "none"
    })
}