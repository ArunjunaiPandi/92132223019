const AUTH_URL = "http://20.244.56.144/evaluation-service/auth";
const LOGS_URL = "http://20.244.56.144/evaluation-service/logs";
const authPayload = {
    "email":"arunjunaipandi281@gmail.com",
    "name":"arunjunai pandi v",
    "rollNo":"92132223019",
    "accessCode":"rBPfSS",
    "clientID":"420950f9-97ce-4c77-9ecd-220f22a6a4fb",
    "clientSecret":"UwKznMQpTSdTDFyf"
};

async function getAuthToken() {
    const res = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authPayload)
    });
    const data = await res.json();
    return data.access_token;
}

async function log(stack, level, pkg, message) {
    try {
        const token = await getAuthToken();
        await fetch(LOGS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ stack, level, package: pkg, message })
        });
    } catch (err) {
        console.error("Logger API failed!", err);
    }
}

module.exports = { log };

