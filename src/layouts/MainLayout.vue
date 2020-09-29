<template>
   <q-layout view="hHh lpR fFf">
      <q-header>
         <q-toolbar>
            <q-btn
               icon="arrow_back"
               v-go-back.single
               v-if="getScreen != 'home' && getScreen != 'auth'"
               flat
               dense
            />
            <!-- Name -->
            <div class="absolute-center row">
               <q-icon name="chat" size="30px" class="flip-horizontal" />
               <q-toolbar-title v-if="this.$route.fullPath.includes('/chat')">{{otherUserDetails.name}}</q-toolbar-title>
               <q-toolbar-title v-else>qChat</q-toolbar-title>
            </div>
            <q-space />
            <q-btn
               to="/profile"
               icon="perm_identity"
               v-if="!!userDetails.uid && getScreen=='home'"
               flat
            />
         </q-toolbar>
      </q-header>
      <q-page-container>
         <router-view />
      </q-page-container>
   </q-layout>
</template>

<script>
import {mapState} from 'vuex'
import mixinOtherUserDetails from "src/mixins/mixin-otherUserDetails"    


export default {
   mixins:[mixinOtherUserDetails],
   data() {
      return {};
   },
   computed: {
      ...mapState("store", ["userDetails"]),
      getScreen() {
         switch (this.$route.fullPath) {
            case "/chat":
               return "chat";
               break;
            case "/auth":
               return "auth";
               break;
            case "/profile":
               return "profile";
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
.q-page-container{
   background-color: $secondary;
}
</style>