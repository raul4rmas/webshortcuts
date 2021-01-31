chrome.omnibox.onInputEntered.addListener(
    function(text) {
        chrome.storage.sync.get(null, function(items) {
            for (key in items) {
                if (key == text) { 
                    chrome.tabs.update({url: items[key]})
                } 
            }
        })
    }
)