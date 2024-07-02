// content.js

console.log("this is content.js")

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("hi")
    console.log("hi",message)
    if (message.type === 'maliciousUrl') {
        window.stop();
        console.log("malli")
        localStorage.setItem('current',JSON.stringify( {type:"bad",url:message.url}));;

        sendResponse({ status: 'URL stored in local storage' });
    }
});
