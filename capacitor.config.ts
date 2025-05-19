import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "app.easysmartlock.fr",
  appName: "EasySmartLock",
  webDir: "www",
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;
