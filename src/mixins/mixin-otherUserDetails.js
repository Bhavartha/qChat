export default {
    computed:{
        otherUserDetails(){
            let oid = this.$route.params.oid
            return this.$store.state.store.users[oid]
        }
    }
}