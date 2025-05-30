import { useEffect } from 'react';
import { configurePushNotifications } from '../../utils/notificationHandler';

const AppInitializer = () => {
  useEffect(() => {
    configurePushNotifications();
  }, []);

  return null; 
};

export default AppInitializer;
