const PUSH_TITLE = "Está pasando en Con pinta.";
const PUSH_BODY = "20 minutos.";
const PUSH_URL = "/las21";
const PUSH_TAG = "conpinta-las21";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = {};
  }
  const title = data.title || PUSH_TITLE;
  const body = data.body || PUSH_BODY;
  const url = data.url || PUSH_URL;
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      tag: PUSH_TAG,
      data: { url },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = event.notification.data && event.notification.data.url
    ? event.notification.data.url
    : PUSH_URL;
  const dest = new URL(target, self.location.origin).href;
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((windows) => {
      for (const client of windows) {
        if (client.url.startsWith(dest) && "focus" in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(dest);
      }
      return undefined;
    }),
  );
});

self.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "conpinta-las21") return;
  const title = event.data.title || PUSH_TITLE;
  const body = event.data.body || PUSH_BODY;
  const url = event.data.url || PUSH_URL;
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      tag: PUSH_TAG,
      data: { url },
    }),
  );
});
