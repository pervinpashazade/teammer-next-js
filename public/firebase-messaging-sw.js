
importScripts("https://www.gstatic.com/firebasejs/8.2.6/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.6/firebase-messaging.js");

try {
    firebase.initializeApp({
        apiKey: "AIzaSyBhlCe8xclwZnrhesLlGiUOOWNtc7gnXVQ",
        authDomain: "firstapp-5cfcd.firebaseapp.com",
        projectId: "firstapp-5cfcd",
        storageBucket: "firstapp-5cfcd.appspot.com",
        messagingSenderId: "153910205936",
        appId: "1:153910205936:web:5104d95f9122462045d135",
        databaseURL: 'https://firstapp-5cfcd-default-rtdb.firebaseio.com',
    });

    const messaging = firebase.messaging();

    self.addEventListener("notificationclick", function (event) {
        const target = event.notification.data.click_action || "/";
        event.notification.close();

        clients
            .matchAll({ type: "window", includeUncontrolled: true })
            .then(function (clientList) {
                for (let i = 0; i < clientList.length; i++) {
                    let client = clientList[i];
                    if (client.url === target && "focus" in client) {
                        return client.focus();
                    }
                }
                return clients.openWindow(target);
            });
    });

    messaging.onBackgroundMessage(async (payload) => {
        if (payload?.data?.event === "push") {
            const title = payload.notification.title;

            await self.registration.showNotification(title, {
                body: payload.notification.body,
            });
        }
    });
} catch (e) {
    console.log(e);
}