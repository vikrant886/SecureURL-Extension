const API_KEY = 'AIzaSyA3ineL93uf7D5vOQJGk3qWIHp9rpVKOro';
const API_URL = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`;

chrome.tabs.onCreated.addListener(async (tab) => {
    console.log(tab)
    const url = tab.pendingUrl;
    if (url && url!="chrome://newtab/") {
        console.log(`Checking URL: ${url}`);
        const isSafe = await checkUrlSafety(url);
        if (!isSafe) {
            chrome.tabs.sendMessage(tab.id, { type: 'maliciousUrl', url: tab.url }, (response) => {
                console.log('Response from content script:', response);
            });
        } else {
            console.log(`The URL ${url} is safe.`);
        }
    }
});

chrome.tabs.onUpdated.addListener(async(tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        const isSafe = await checkUrlSafety(tab.url);

        if (!isSafe) {
            chrome.tabs.sendMessage(tabId, { type: 'maliciousUrl', url: tab.url }, (response) => {
                console.log('Response from content script:', response);
            });
        }
        else {
            chrome.tabs.sendMessage(tabId, { type: 'good', url: tab.url }, (response) => {
                console.log('Response from content script:', response);
            });
        }
    }
});

async function checkUrlSafety(url) {
    try {
        const response = await fetch("http://127.0.0.1:4000/upload", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const data = await response.json();
        console.log(data[0].label);
        const isSafe = data[0].label === "BENIGN" ? true : false; 

        return isSafe;
    } catch (error) {
        console.error('Error checking URL safety:', error);
        return false;
    }
}

function notifyUnsafeUrl(url) {
    chrome.notifications.create({
        type: 'basic',
        title: 'Unsafe URL Detected',
        message: `Warning: The URL ${url} is flagged as unsafe.`,
        priority: 2
    });
}