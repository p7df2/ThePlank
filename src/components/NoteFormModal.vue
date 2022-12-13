<template>
  <ion-modal :is-open="show">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @touchstart="cancel" @click="cancel"
            ><ion-icon
              :icon="arrowBackOutline"
              style="padding-right: 4px"
            ></ion-icon
            >Back</ion-button
          >
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @touchstart="confirm" @click="confirm"
            >Add
            <ion-icon
              :icon="arrowForwardOutline"
              style="padding-left: 4px"
            ></ion-icon
          ></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div
        contenteditable="true"
        id="text-input"
        data-placeholder="what do you want to add ?"
      ></div>
    </ion-content>
  </ion-modal>
</template>
<script>
import {
  IonModal,
  IonToolbar,
  IonButtons,
  IonHeader,
  IonContent,
  IonIcon,
  IonButton,
} from "@ionic/vue";
import { arrowBackOutline, arrowForwardOutline } from "ionicons/icons";
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "NoteFormModal",
  props: {
    show: Boolean,
  },
  components: {
    IonModal,
    IonToolbar,
    IonButtons,
    IonHeader,
    IonContent,
    IonIcon,
    IonButton,
  },
  setup(props, context) {
    const store = useStore();

    var flagCancel = false;
    const cancel = () => {
      if (!flagCancel) {
        flagCancel = true;
        setTimeout(() => {
          flagCancel = false;
        }, 100);
        context.emit("cancel");
      }
    };

    var flagConfirm = false;
    const confirm = () => {
      if (!flagConfirm) {
        flagConfirm = true;
        setTimeout(() => {
          flagConfirm = false;
        }, 100);
        let text = document.getElementById("text-input").textContent;
        if (text.toString().length > 1) {
          store.dispatch("addNote", text);
        }

        context.emit("cancel");
      }
    };
    return {
      arrowBackOutline,
      arrowForwardOutline,
      cancel,
      confirm,
    };
  },
});
</script>

<style scoped>
ion-button {
  font-size: 14px;
  font-weight: 700;
}
#text-input {
  min-height: 200px;
  font-size: 18px;
  padding: 16px 16px 0 16px;
}

#text-input:focus {
  outline: none;
}

#text-input:empty:before {
  content: attr(data-placeholder);
  font-size: 18px;
  opacity: 0.6;
}
</style>
