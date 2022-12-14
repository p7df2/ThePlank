<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title slot="start">⛵️The Plank</ion-title>
        <NoteDownloadButton slot="end" class="ion-margin-end"/>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div v-if="notes.length > 0">
        <NoteDisplay
          v-for="item in notes"
          :content="item.text"
          :id="item.id"
          :key="item.id"
        />
      </div>
    </ion-content>
    <button id="add-button" @touchstart="onAdd" @click="onAdd">+</button>
    <NoteFormModal :show="showModal" @cancel="showModal = !showModal" />
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent, computed, ref } from "vue";
import NoteDisplay from "../components/NoteDisplay.vue";
import NoteFormModal from "../components/NoteFormModal.vue";
import NoteDownloadButton from "../components/NoteDownloadButton.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    NoteDisplay,
    NoteFormModal,
    NoteDownloadButton,
  },
  setup() {
    const store = useStore();
    store.dispatch("initNotes");
    const showModal = ref(false);
    var flag = false;
    const onAdd = () => {
      if (!flag) {
        flag = true;
        setTimeout(() => {
          flag = false;
        }, 100);
        showModal.value = true;
      }
    };

    return {
      notes: computed(() => store.getters.allNotes),
      onAdd,
      showModal,
    };
  },
});
</script>

<style scoped>
#add-button {
  position: absolute;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  height: 64px;
  width: 64px;
  font-size: 48px;
  border-radius: 100%;
  text-align: center;
  line-height: 1.2;
  font-family: "Times New Roman", Times, serif;
  font-weight: bolder;
  border: solid rgb(146, 146, 146) 4px;
  background: rgba(239, 239, 239, 0.052);
  z-index: 999;
}

#add-button:active {
  background: yellow;
}
</style>
