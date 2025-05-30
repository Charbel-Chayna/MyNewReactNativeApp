import { getCrashlytics, log, crash } from '@react-native-firebase/crashlytics';

const crashlytics = getCrashlytics();

export const triggerTestCrash = () => {
  log(crashlytics, '🔥 Forced crash for Firebase Crashlytics test');
  crash(crashlytics);
};
