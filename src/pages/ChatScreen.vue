<template>
   <q-page class="flex column chatPage" ref="chatPage">
      <div
         class="q-py-md q-px-lg column col justify-end"
         :class="{ invisible: hideMsg }"
      >
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
         <q-form @submit="sendMsg">
            <q-input
               color="primary"
               outlined
               v-model="newMsg"
               ref="newMsg"
               label="Message"
               class="q-my-sm q-mx-lg"
            >
               <template v-slot:append>
                  <q-btn flat round dense icon="send" color="primary" type="submit" @click="sendMsg"/>
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
         if (this.newMsg == "") return;
         let oid = this.$route.params.oid;
         this.firebaseSendMessage({
            text: this.newMsg,
            oid: oid,
         });
         this.newMsg = "";
      },
      scrollToBottom() {
         let chatPage = this.$refs.chatPage.$el;
         setTimeout(() => {
            window.scrollTo(0, chatPage.scrollHeight);
         }, 20);
      },
   },
   watch: {
      messages(val) {
         if (Object.keys(val).length) {
            this.scrollToBottom();
            setTimeout(() => {
               this.hideMsg = false;
            }, 20);
         }
      },
   },
   data() {
      return {
         newMsg: "",
         hideMsg: true,
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