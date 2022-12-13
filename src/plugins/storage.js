import { Storage, Drivers } from "@ionic/storage";
import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";

export default {
  install: async (app) => {
    const storage = new Storage({
      name: "_thePlankStorage",
      driverOrder: [
        CordovaSQLiteDriver._driver,
        Drivers.IndexedDB,
        Drivers.LocalStorage,
      ],
    });
    const storageInstance = await storage.create();

    app.config.globalProperties.$ionicStorage = storageInstance;
    app.config.globalProperties.$store.$ionicStorage = storageInstance; // This one is only needed if you want to access the ionic storage instance in your VUEX store actions
  },
};
