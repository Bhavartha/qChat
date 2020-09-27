<template>
   <q-page class="flex column">
      <div class="q-py-md q-px-lg column col justify-end">
         <q-chat-message
            v-for="(msg, key) in messages"
            :key="key"
            :text="[msg.text]"
            :bg-color="msg.sent ? '' : 'primary'"
            :text-color="msg.sent ? '' : 'white'"
            :sent="msg.sent"
            text-sanitize
         />
      </div>
      <q-footer>
         <q-form @submit.prevent="sendMsg">
            <q-input
               color="primary"
               outlined
               v-model="newMsg"
               label="Message"
               class="q-my-sm q-mx-lg"
            >
               <template v-slot:append>
                  <q-icon name="send" color="primary" />
               </template>
            </q-input>
         </q-form>
      </q-footer>
   </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import mixinOtherUserDetails from "src/mixins/mixin-otherUserDetails";

export default {
   mixins: [mixinOtherUserDetails],
   methods: {
      ...mapActions("store", [
         "firebaseGetMessages",
         "firebaseStopGettingMessages",
         "firebaseSendMessage",
      ]),
      sendMsg() {
         let oid = this.$route.params.oid;
         this.firebaseSendMessage({
            text: this.newMsg,
            oid: oid
         })
         this.newMsg=""
      },
   },
   data() {
      return {
         newMsg: "",
      };
   },
   mounted() {
      let oid = this.$route.params.oid;
      this.firebaseGetMessages(oid);
   },
   computed: {
      ...mapState("store", ["messages"]),
   },
   destroyed() {
      this.firebaseStopGettingMessages();
   },
};
</script>

<style lang="scss" scoped>
.q-footer {
   background-color: white;
}
</style>