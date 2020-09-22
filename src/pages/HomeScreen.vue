<template>
   <q-page class="flex">
      <q-list class="full-width" separator>
         <q-item v-for="(user,key) in users" :key="key" clickable v-ripple to="/chat">
            <q-item-section avatar>
               <q-avatar>
                  <img :src="user.dp" />
               </q-avatar>
            </q-item-section>
            <q-item-section>
               <q-item-label>{{ user.name }}</q-item-label>
            </q-item-section>
            <q-item-section side>
               <q-avatar :color="user.online?'green':'red'" size="10px" />
            </q-item-section>
         </q-item>
      </q-list>
   </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
   computed: {
      ...mapGetters("store",["users"])
   },
   data() {
      return {
         
      };
   },
};
</script>

<style lang="scss" scoped>
.q-list {
   padding: 0 10px;
   .q-item {
      padding: 10px 5px;
   }
}
</style>