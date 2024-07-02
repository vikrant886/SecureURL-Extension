document.addEventListener("DOMContentLoaded", function () {
    const continueUrl = new URLSearchParams(window.location.search).get('continueUrl');

    document.getElementById('continueButton').addEventListener('click', function () {
        if (continueUrl) {

            chrome.storage.local.get(["allowed"], function (result) {
                // alert(result)
                console.log(result)
                let data = [];
                if (result.allowed) {
                    data = JSON.parse(result.allowed);
                    console.log("allowed", data)
                }
                data.push(continueUrl);
                chrome.storage.local.set({ allowed: JSON.stringify(data) }, () => {
                    console.log("updated allowed");
                });
                window.location.href = continueUrl;
            });
        } else {
            window.location.href = "default.html";
        }
    });
});