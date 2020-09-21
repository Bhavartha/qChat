<template>
   <q-layout view="hHh lpR fFf">
      <q-header>
         <q-toolbar>
            <q-btn icon="arrow_back" v-go-back.single v-if="getScreen=='chat'" flat dense />
            <!-- Name -->
            <div class="absolute-center row">
               <q-icon name="chat" size="30px" class="flip-horizontal" />
               <q-toolbar-title>qChat</q-toolbar-title>
            </div>
         </q-toolbar>
      </q-header>
      <q-page-container>
         <router-view />
      </q-page-container>
   </q-layout>
</template>

<script>
export default {
   data() {
      return {};
   },
   computed: {
      getScreen() {
         switch (this.$route.fullPath) {
            case "/chat":
               return "chat";
               break;
            case "/auth":
               return "auth";
               break;
            case "/":
               return "home";
               break;
         }
      },
   },
};
</script>

<style lang="scss" scoped>
</style>