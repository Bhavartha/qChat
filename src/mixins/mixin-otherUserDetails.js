export default {
    computed:{
        otherUserDetails(){
            let oid = this.$route.params.oid
            if(this.$store.state.store.users[oid])
            return this.$store.state.store.users[oid]
        }
    }
}