import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.theplank.app',
  appName: 'The Plank',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
        launchShowDuration: 1000,
        launchAutoHide: true,
        splashImmersive: true,
    }
}
};

export default config;
