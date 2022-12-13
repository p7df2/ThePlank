import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.theplank.app',
  appName: 'plank',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
        launchShowDuration: 100,
        launchAutoHide: true,
        splashImmersive: true,
    }
}
};

export default config;
