<template>
   <q-page class="flex">
      <q-list class="full-width" separator>
         <q-item v-for="user in users" :key="user.id" clickable v-ripple to="/chat">
            <q-item-section avatar>
               <q-avatar>
                  <img src="https://picsum.photos/100" />
               </q-avatar>
            </q-item-section>
            <q-item-section>
               <q-item-label>{{ user.name }}</q-item-label>
               <!-- <q-item-label caption lines="1">{{ user.email }}</q-item-label> -->
            </q-item-section>
            <q-item-section side>
               <q-avatar :color="user.online?'green':'red'" size="10px" />
            </q-item-section>
         </q-item>
      </q-list>
   </q-page>
</template>

<script>
export default {
   data() {
      return {
         users: [
            {
               id: 1,
               name: "Ruddy Jedrzej",
               online: true,
            },
            {
               id: 2,
               name: "Mallorie Alessandrini",
               online: true,
            },
            {
               id: 3,
               name: "Elisabetta Wicklen",
               online: false,
            },
            {
               id: 4,
               name: "Seka Fawdrey",
               online: true,
            },
         ],
      };
   },
};
</script>

<style lang="scss" scoped>
.q-list{
  padding: 0 10px;
  .q-item{
    padding: 10px 5px;
  }
}
</style>