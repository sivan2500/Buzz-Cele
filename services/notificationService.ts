
export const checkNotificationPermission = (): NotificationPermission => {
  if (!('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support desktop notification');
    return false;
  }
  
  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

export const sendNotification = (title: string, options?: NotificationOptions) => {
  if (checkNotificationPermission() === 'granted') {
    try {
      new Notification(title, {
        icon: '/vite.svg', // Fallback to site icon
        badge: '/vite.svg',
        ...options
      });
    } catch (e) {
      console.error("Failed to send notification", e);
    }
  }
};

// Simulation for "Push" events from a backend
export const simulateIncomingPush = (callback: (title: string, body: string, category?: string) => void) => {
  // Simulate a breaking news event after a random delay
  const headlines = [
    { title: "BREAKING: Secret Wedding!", body: "You won't believe which co-stars just tied the knot in Vegas.", category: "Celebrity" },
    { title: "Red Carpet Disaster", body: "Wardrobe malfunction stops the show at Cannes.", category: "Fashion" },
    { title: "Tour Cancelled", body: "Health concerns force pop icon to cancel world tour dates.", category: "Music" },
    { title: "Royal Baby News", body: "Palace confirms the rumors are true.", category: "Royals" }
  ];

  const timeoutId = setTimeout(() => {
    const randomNews = headlines[Math.floor(Math.random() * headlines.length)];
    callback(randomNews.title, randomNews.body, randomNews.category);
  }, 10000 + Math.random() * 20000); // Trigger between 10-30 seconds for demo

  return () => clearTimeout(timeoutId);
};
