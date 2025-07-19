
const API_URL: string = "https://analyticsapi.stoobit.com/track";
const API_KEY: string = "588f7d5dc6066771076f3fe8c60a42a4";
export function imageOpened(title: string, category: string) {
    var userid = generateAndGetUserId()
    var os = detectOS()
    const body = {
        id: new Date().getMilliseconds().toString(),
        name: "image opened",
        defaultprops: { os: os.os, userid: userid, os_version: os.version },
        customprops: { title: title, category: category },
        time: new Date().toISOString()
    };
    fetch(
        API_URL,
        {
            method: "POST",
            body: JSON.stringify([body]),
            headers: {
                "Content-Type": "application/json",
                "Authorization": API_KEY
            },
        }
    )
}

export function imageLiked(title: string | undefined, folder: string | undefined,) {
    var userid = generateAndGetUserId()
    var os = detectOS()
    const body = {
        id: new Date().getMilliseconds().toString(),
        name: "image liked",
        defaultprops: { os: os.os, userid: userid, os_version: os.version },
        customprops: { title: title, category: folder },
        time: new Date().toISOString()
    };
    fetch(
        API_URL,
        {
            method: "POST",
            body: JSON.stringify([body]),
            headers: {
                "Content-Type": "application/json",
                "Authorization": API_KEY
            },
        }
    )
}

export function categoryOpened(title: string | undefined) {
    var userid = generateAndGetUserId()
    var os = detectOS()
    const body = {
        id: new Date().getMilliseconds().toString(),
        name: "category opened",
        defaultprops: { os: os.os, userid: userid, os_version: os.version },
        customprops: { title: title },
        time: new Date().toISOString()
    };
    fetch(
        API_URL,
        {
            method: "POST",
            body: JSON.stringify([body]),
            headers: {
                "Content-Type": "application/json",
                "Authorization": API_KEY
            },
        }
    )
}

export function categoryTime(time: string, folder: string | undefined) {
    var userid = generateAndGetUserId()
    var os = detectOS()
    const body = {
        id: new Date().getMilliseconds().toString(),
        name: "category length of stay",
        defaultprops: { os: os.os, userid: userid, os_version: os.version },
        customprops: { duration: time, category: folder },
        time: new Date().toISOString()
    };
    fetch(
        API_URL,
        {
            method: "POST",
            body: JSON.stringify([body]),
            headers: {
                "Content-Type": "application/json",
                "Authorization": API_KEY
            },
        }
    )
}

function generateAndGetUserId() {
    var userid = localStorage.getItem("userid");
    if (userid === null) {
        userid = new Date().getMilliseconds().toString()
        localStorage.setItem("userid", userid)
    }
    return userid
}

function detectOS() {
    const userAgent = navigator.userAgent;
    let os = "unknown";
    let version = "unknown";

    // iOS-Erkennung
    if (/iPhone/.test(userAgent)) {
        os = "iOS";
        const versionMatch = userAgent.match(/OS (\d+)_?(\d+)?_?(\d+)?/);
        if (versionMatch) {
            version = versionMatch.slice(1).filter(Boolean).join('.');
        }
    }

    if (/iPad/.test(userAgent)) {
        os = "iPadOS";
        const versionMatch = userAgent.match(/OS (\d+)_?(\d+)?_?(\d+)?/);
        if (versionMatch) {
            version = versionMatch.slice(1).filter(Boolean).join('.');
        }
    }

    // Android-Erkennung
    else if (/android/i.test(userAgent)) {
        os = "Android";
        const versionMatch = userAgent.match(/Android\s([0-9\.]+)/);
        if (versionMatch) {
            version = versionMatch[1];
        }
    }

    return { os, version };
}
