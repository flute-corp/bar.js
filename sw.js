'use strict';
const applicationServerPublicKey = 'BGuXIbVqIJus84UH-TlLZv2hwaN7gpPhTZUGJJzGSBV2J0Qjt0cYvoswh8V-NMTQIoApscm2Fc0C5gVmRjBIGp8';

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

self.addEventListener('push', function(event) {
    const opt = {
        "body": "C'est l'heure de la binouze !",
        "icon": "src/img/favicon/android-chrome-256x256.png",
        "badge": "src/img/favicon/android-chrome-256x256.png",
        "vibrate": [100,200,100,100,75,25,100,200,100,500,100,200,100,500],
        "tag": "request",
        "actions": [
            { "action": "yes", "title": "🍺Yhea!" },
            { "action": "no", "title": "😥Nope!" }
        ]
    };
    if (event.data) {
        Object.assign(opt, event.data.json());
    }
    const title = 'Bar.js';

    event.waitUntil(self.registration.showNotification(title, opt));
});

self.addEventListener('notificationclick', function(event) {

    event.notification.close();

    const origin = self.location.origin;

    const promiseChain = clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        })
        .then(function (windowClients) {
            let matchingClient = null;

            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                if (windowClient.url.startsWith(origin)) {
                    matchingClient = windowClient;
                    break;
                }
            }

            if (matchingClient) {
                return matchingClient.focus();
            } else {
                return clients.openWindow("./#"+ event.action);
            }
        });

    event.waitUntil(promiseChain);
});

self.addEventListener('pushsubscriptionchange', function(event) {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    event.waitUntil(
        self.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
            .then(function(newSubscription) {
                // TODO: Send to application server
                console.log('[Service Worker] New subscription: ', newSubscription);
            })
    );
});
