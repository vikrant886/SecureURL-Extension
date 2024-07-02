console.log("this is content.js");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    chrome.storage.local.set({ current: {url:message.url,type:message.type} });

    if (message.type === 'maliciousUrl' && message.url !== "chrome://newtab/") {
        chrome.storage.local.get(["allowed"], (result) => {
            const allowed = result.allowed || [];
            const isAllowed = allowed.includes(message.url);

            if (!isAllowed) {
                window.stop();

                const warningPageUrl = chrome.runtime.getURL('malicious.html') + '?continueUrl=' + encodeURIComponent(message.url);
                chrome.storage.local.get(["bad"], (result) => {
                    let data = [];
                    if (result.bad) {
                        data = JSON.parse(result.bad);
                    }
                    data.push(message.url);
                    chrome.storage.local.set({ bad: JSON.stringify(data) });
                });

                window.location.href = warningPageUrl;
            }
        });

        sendResponse({ status: 'URL stored in local storage' });
    } else {
        chrome.storage.local.get(["good"], (result) => {
            let data = [];
            if (result.good) {
                data = JSON.parse(result.good);
            }
            data.push(message.url);
            chrome.storage.local.set({ good: JSON.stringify(data) });
        });

        sendResponse({ status: 'URL stored in local storage' });
    }
});
