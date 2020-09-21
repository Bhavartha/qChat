<template>
   <q-page class="flex column">
      <div class="q-py-md q-px-lg column col">
         <q-chat-message
            v-for="msg in messages"
            :key="msg"
            :text="[msg.text]"
            :bg-color="msg.from=='me'?'':'primary'"
            :text-color="msg.from=='me'?'':'white'"
            :sent="msg.from=='me'"
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
export default {
    methods:{
        sendMsg(){
            this.messages.push({text:this.newMsg,from:"me"})
            this.newMsg=""
        }
    },
   data() {
      return {
         newMsg: "",
         messages: [
            {
               text: "Hello.",
               from: "me",
            },
            {
               text: "Hi. Long time no see",
               from: "them",
            },
            {
               text: "Lets meet sometime",
               from: "me",
            },
            {
               text: "Yeah Sure!",
               from: "them",
            },
         ],
      };
   },
};
</script>

<style lang="scss" scoped>
.q-footer{
    background-color: #fff;
}
</style>