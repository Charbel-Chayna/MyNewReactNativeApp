import PushNotification from 'react-native-push-notification';
import { Linking } from 'react-native';

let pendingDeepLink: string | null = null;

export const getPendingDeepLink = () => pendingDeepLink;
export const clearPendingDeepLink = () => {
  pendingDeepLink = null;
};

export const configurePushNotifications = () => {
  PushNotification.createChannel(
    {
      channelId: 'default-channel-id',
      channelName: 'Default Channel',
      importance: 4,
      vibrate: true,
    },
    (created: boolean) => console.log(`createChannel returned '${created}'`)
  );

  PushNotification.configure({
    onNotification: function (notification: any) {
      console.log('NOTIFICATION:', notification);

      if (notification.userInteraction) {
        const productId =
          notification.data?.productId || notification.userInfo?.productId;

        if (productId) {
          const url = `Cartify://product/${productId}`;
          console.log('Storing pending deep link:', url);
          pendingDeepLink = url;

          if (notification.foreground) {
            Linking.openURL(url).catch(err =>
              console.error('Failed to open deep link:', err)
            );
            pendingDeepLink = null; 
          }
        }
      }

      if (typeof notification.finish === 'function') {
        notification.finish(PushNotification.FetchResult.NoData);
      }
    },

    popInitialNotification: true,
    requestPermissions: true,
  });
};

export const triggerLocalNotification = (productId: string) => {
  PushNotification.localNotification({
    channelId: 'default-channel-id',
    title: 'New Product Added!',
    message: 'Check out the latest product now.',
    playSound: true,
    soundName: 'default',
    importance: 'high',
    vibrate: true,
    data: { productId },
  });
};
