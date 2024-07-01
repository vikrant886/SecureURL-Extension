const API_KEY = 'AIzaSyA3ineL93uf7D5vOQJGk3qWIHp9rpVKOro';
const API_URL = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`;

chrome.tabs.onCreated.addListener(async (tab) => {
    const url = tab.pendingUrl;
    if (url) {
        console.log(`Checking URL: ${url}`);
        const isSafe = await checkUrlSafety(url);
        chrome.storage.local.set({ lastCheckedUrl: { url, isSafe } });
        if (!isSafe) {
            notifyUnsafeUrl(url)
        } else {
            console.log(`The URL ${url} is safe.`);
        }
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        console.log(`URL updated: ${changeInfo.url}`);

        // Check URL safety using Flask server or Google Safe Browsing API
        checkUrlSafety(changeInfo.url).then((isSafe) => {
            if (!isSafe) {
                notifyUnsafeUrl(changeInfo.url);
            }
        });
    }
});

// Function to check URL safety using Flask server or Google Safe Browsing API
async function checkUrlSafety(url) {
    try {
        // Send a POST request to your Flask server or Google Safe Browsing API
        const response = await fetch("http://127.0.0.1:4000/upload", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const data = await response.json();
        console.log(data[0].label);
        const isSafe = data[0].label === "BENIGN"; // Assuming the label field indicates safety

        return isSafe;
    } catch (error) {
        console.error('Error checking URL safety:', error);
        return false;
    }
}

// Function to create a notification for unsafe URLs
function notifyUnsafeUrl(url) {
    chrome.notifications.create({
        type: 'basic',
        title: 'Unsafe URL Detected',
        message: `Warning: The URL ${url} is flagged as unsafe.`,
        priority: 2
    });
}