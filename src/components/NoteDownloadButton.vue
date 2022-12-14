<template>
  <button @touchstart="downloadNotes" @click="downloadNotes">🖨️</button>
</template>
<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { getPlatforms } from "@ionic/vue";
import { alertController } from "@ionic/vue";

export default defineComponent({
  setup() {
    const store = useStore();
    const platforms = getPlatforms();
    var alertMessage = "";
    const presentAlert = async () => {
      const alert = await alertController.create({
        header: "Success",
        message: alertMessage,
        buttons: ["OK"],
        cssClass: "alert-saved",
      });

      await alert.present();
    };

    var flag = false;
    const downloadNotes = () => {
      if (!flag) {
        flag = true;
        setTimeout(() => {
          flag = false;
        }, 100);

        var text = "";
        store.getters.allNotes.forEach((item) => {
          text +=
            "id:" +
            item.id +
            " date:" +
            item.when +
            "\r\n" +
            item.text +
            "\r\n";
        });

        if (platforms.includes("desktop")) {
          downloadDesktop(text);
        } else if (platforms.includes("android")) {
          writeMobile(text);
        }
      }
    };

    const downloadDesktop = (text) => {
      let filename = "notes.txt";

      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    };

    const writeMobile = async (text) => {
      //creates dir if it doesn't exist already
      try {
        await Filesystem.mkdir({
          path: "/theplank",
          directory: Directory.Documents,
          recursive: false,
        });
      } catch (e) {
        //console.error("Unable to make directory", e);
      }
      //write file to dir
      try {
        await Filesystem.writeFile({
          path: "theplank/notes.txt",
          data: text,
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        });
        alertMessage =
          "File has been saved to " +
          Directory.Documents.toString() +
          "/theplank/notes.txt";
        presentAlert();
      } catch (e) {
        //console.error("Unable to write file", e);
      }
    };

    return {
      downloadNotes,
    };
  },
});
</script>
<style scoped>
button {
  font-size: 18px;
  height: 36px;
  width: 36px;
  text-align: center;
  background: rgb(47, 47, 47);
  border-radius: 4px;
}
</style>
<style>
.alert-saved {
  --min-width: 350px;
}
</style>
