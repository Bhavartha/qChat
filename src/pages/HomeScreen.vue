<template>
   <q-page class="flex">
      <q-list class="full-width" separator>
         <q-input color="teal" outlined v-model="search" label="Search user by name/email" class="q-ma-md">
            <template v-slot:append>
               <q-icon name="search" />
            </template>
         </q-input>
         <q-item v-for="(user,key) in filteredUsers" :key="key" clickable v-ripple to="/chat">
            <q-item-section avatar>
               <q-avatar>
                  <img :src="user.dp" />
               </q-avatar>
            </q-item-section>
            <q-item-section>
               <q-item-label>{{ user.name }}</q-item-label>
               <q-item-label caption>{{user.email}}</q-item-label>
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
      ...mapGetters("store", ["users"]),
      filteredUsers() {
         let _users = {};
         Object.keys(this.users).forEach((key) => {
            if (
               this.users[key].name.toLowerCase().match(this.search.toLowerCase()) ||
               this.users[key].email.toLowerCase().match(this.search.toLowerCase())
            ) {
               _users[key] = this.users[key];
            }
         });
         return _users;
      },
   },
   data() {
      return {
         search: "",
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