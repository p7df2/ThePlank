var CryptoJS = require("crypto-js");
const secret = process.env.VUE_APP_CRYPTOJS_SECRET;
const storeName = "notes";

const state = {
  notes: [],
};

const getters = {
  allNotes: (state) => state.notes,
};

const encryptNotes = (notes) => {
  notes = JSON.stringify(notes);
  return CryptoJS.AES.encrypt(notes, secret).toString();
};

const decryptNotes = (notes) => {
  return JSON.parse(
    CryptoJS.AES.decrypt(notes, secret).toString(CryptoJS.enc.Utf8)
  );
};

const actions = {
  async addNote({ commit, getters }, noteText) {
    commit("newNote", noteText);
    let notes = getters.allNotes;
    notes = encryptNotes(notes);
    await this.$ionicStorage.set(storeName, notes);
  },
  async deleteNote({ commit, state }, id) {
    commit("deleteNote", id);
    let notes = encryptNotes(state.notes);
    await this.$ionicStorage.set(storeName, notes);
  },
  async initNotes({ commit }) {
    let notes = await this.$ionicStorage.get(storeName);
    if (notes) {
      notes = decryptNotes(notes);
      commit("setState", notes);
    }
  },
};

const mutations = {
  newNote: (state, noteText) => {
    let noteId = state.notes.length - 1;
    let note = {
      id: noteId,
      text: noteText,
    };
    state.notes.unshift(note);
  },
  deleteNote: (state, id) => {
    let arr = state.notes;
    state.notes = arr.filter((item) => {
      return item.id != id;
    });
  },
  setState: (state, notes) => (state.notes = notes),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
