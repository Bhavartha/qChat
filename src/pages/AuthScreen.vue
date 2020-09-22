<template>
   <q-page class="flex">
      <div class="my-card full-width q-pa-md absolute-center">
         <q-tabs v-model="tab" dense class="bg-grey-3" align="justify" narrow-indicator>
            <q-tab name="login" label="Login" />
            <q-tab name="register" label="Register" />
         </q-tabs>
         <q-tab-panels animated v-model="tab">
            <q-tab-panel name="login">
               <auth-component :tab="tab" />
            </q-tab-panel>
            <q-tab-panel name="register">
               <auth-component :tab="tab" />
            </q-tab-panel>
         </q-tab-panels>
      </div>
   </q-page>
</template>

<script>
export default {
   data() {
      return {
         tab: "login",
      };
   },
   components: {
      "auth-component": require("components/AuthComponent").default,
   },
};
</script>

<style lang="scss" scoped>
.my-card{
   max-width: 500px;
   height: 100%;
}
</style>