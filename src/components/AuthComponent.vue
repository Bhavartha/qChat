<template>
   <q-form @submit.prevent="formSubmit" class="q-gutter-md text-center">
      <q-input v-if="tab=='register'" outlined v-model="formData.name" label="Name" />
      <q-input outlined v-model="formData.email" label="Email" type="email" />
      <q-input outlined v-model="formData.password" label="Password" type="password" />
      <q-btn :label="tab" type="submit" color="primary"/>
   </q-form>
</template>

<script>

import { mapActions } from 'vuex'

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
   methods:{
      ...mapActions('store',['registerUser']),
       formSubmit(){
           if(this.tab=='login'){
               console.log("Logged")
           }
           else{
               this.registerUser()
           }
       }
   }
};
</script>

<style>
</style>