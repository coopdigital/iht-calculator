if (document.addEventListener) {
    var aTags = document.getElementsByTagName("a");
    for (i = 0; i < aTags.length; i++) {
        if (aTags[i].href.includes("pdf")) {
            aTags[i].addEventListener("click", trackLinkClickFunction);
        }
    }
}

function trackLinkClickFunction(event) {
    if (typeof gtag === 'function') {
        if (event.target.href.includes("pdf") && event.target.title !== "") {
            console.log('Sending tracking event to GA: ' + event.target.title);
            gtag('event', 'pdf_view', { 'event_label': event.target.title.toString(), 'event_category': 'pdf' });
        }
    }
}