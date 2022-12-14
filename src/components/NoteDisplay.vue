<template>
  <ion-card>
    <button id="remove-btn" @click="onDelete">✖️</button>
    <ion-card-content>
      {{ content }}
    </ion-card-content>
  </ion-card>
</template>
<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { IonCard, IonCardContent } from "@ionic/vue";
export default defineComponent({
  props: {
    content: String,
    id: Number,
  },
  components: {
    IonCard,
    IonCardContent,
  },
  setup(props) {
    const store = useStore();
    const onDelete = () => {
      store.dispatch("deleteNote", props.id);
    };

    return {
      onDelete,
    };
  },
});
</script>
<style scoped>
ion-card-content {
  font-size: 16px;
  font-weight: 500;
  color: rgb(156, 156, 156);
}
#remove-btn {
  height: 36px;
  width: 36px;
  border-radius: 100%;
  border: solid rgb(20, 20, 20) 2px;
  background: rgb(21, 19, 19);
  font-size: 10px;
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 99;
}

#remove-btn:active {
  border: solid rgb(11, 166, 223) 2px;
}
</style>
