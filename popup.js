import { toggleTargetSize } from "./target-size.js";

document.addEventListener('DOMContentLoaded', init);

// get the current tab
function getTabId() {
    return new Promise(resolve => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            resolve(tabs[0].id);
        });
    })
}

// initialize the extension when the popup is loaded
async function init() {
    const tabId = await getTabId();
    document.getElementById("targetSize").addEventListener('change', evt => {
        setState(tabId, evt, evt.target.id);
        loadScript(tabId, evt);
    });
    restoreCb();
}

// inject the script into the current tab
function loadScript(tabId, evt) {
    chrome.scripting.executeScript({
        target: { tabId },
        function: toggleTargetSize,
        args: [evt.target.checked]
    });
}

// set the checkbox state for the tab
function setState(tabId, event, id) {
    const store = {};
    chrome.storage.sync.get(store[tabId]).then(() => {
        const store = {};
        const isChecked = event.target.checked;
        store[id] = {isChecked, tabId};
        chrome.storage.sync.set( store );
    })
}

// restore the checkbox state
function restoreCb() {
    chrome.storage.sync.get().then(result => {
        const cb = document.getElementById('targetSize');
        cb.checked = result.targetSize.isChecked;
    });
}