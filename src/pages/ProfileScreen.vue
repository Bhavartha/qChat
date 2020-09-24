<template>
   <q-page class="flex justify-center">
      <div class="my-card q-pa-md full-width text-center">
         <div class="q-ma-md">
            <q-img :src="userDetails.dp" spinner-color="white" />
         </div>
         <q-file
            v-model="file"
            label="Choose new Image"
            filled
            accept="image/jpeg, image/png"
         />
         <q-input v-model="user.name" label="Name" class="q-my-lg" />
         <q-btn color="primary" label="Update" @click="onSubmit" />
         <br /><br />
         <q-btn color="red-7" label="LOGOUT" @click="logoutUser" />
      </div>
   </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { fireStorage } from "boot/firebase";

export default {
   data() {
      return {
         file: null,
         user: {
            name: "",
            dp: "",
         },
      };
   },
   methods: {
      ...mapActions("store", ["logoutUser", "updateUserDetails"]),
      async onSubmit() {
         try {
            let path = "DP/" + this.userDetails.uid;
            //Upload file
            if (this.file) {
               await fireStorage.ref(path).put(this.file);
               //Get media URL
               await fireStorage
                  .ref(path)
                  .getDownloadURL()
                  .then((url) => {
                     this.user.dp = url;
                  });
               this.user.file = null;
            }
            this.updateUserDetails(this.user);
         } catch (e) {
            console.log(e);
         }
      },
   },
   computed: {
      ...mapState("store", ["userDetails"]),
   },
   mounted() {
      this.user.name = this.userDetails.name;
      this.user.dp = this.userDetails.dp;
   },
};
</script>

<style lang="scss" scoped>
.my-card {
   max-width: 300px;
   height: 100%;
}
</style>