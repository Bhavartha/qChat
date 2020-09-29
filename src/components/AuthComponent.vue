<template>
   <q-form @submit.prevent="formSubmit" class="q-gutter-md text-center">
      <q-input
         v-if="tab == 'register'"
         outlined
         v-model="formData.name"
         label="Name"
         color="white"
      />
      <q-input
         outlined
         v-model="formData.email"
         label="Email"
         type="email"
         color="white"
      />
      <q-input
         outlined
         v-model="formData.password"
         label="Password"
         type="password"
         color="white"
      />
      <q-btn :label="tab" type="submit" />
   </q-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
   props: ["tab"],
   data() {
      return {
         formData: {
            name: "",
            email: "",
            password: "",
         },
      };
   },
   methods: {
      ...mapActions("store", ["registerUser", "loginUser"]),
      formSubmit() {
         if (this.tab == "login") {
            this.loginUser(this.formData);
         } else {
            this.registerUser(this.formData);
         }
      },
   },
};
</script>

<style>
</style>