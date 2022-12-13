import Vuex from "vuex";
import notes from "./modules/notes.js";

// Create store
export default new Vuex.Store({
  modules: {
    notes,
  },
});
