import { fireAuth, fireDb, fireStorage } from "boot/firebase"

const state = {
    userDetails: {}
}

const mutations = {
    setUserDetails(state, payload) {
        state.userDetails = payload
    }
}

const actions = {
    async registerUser({ }, payload) {
        try {
            await fireAuth.createUserWithEmailAndPassword(payload.email, payload.password)
            let uid = fireAuth.currentUser.uid;
            let dp = await fireStorage.ref().child("DP").child("default-profile-picture.png").getDownloadURL()
            fireDb.ref(`users/${uid}`).set({
                name: payload.name,
                email: payload.email,
                online: true,
                dp: dp,
            })
        } catch (error) {
            alert(error.message)
        }
    },
    async loginUser({ }, payload) {
        try {
            await fireAuth.signInWithEmailAndPassword(payload.email, payload.password)
        } catch (error) {
            alert(error.message)
        }
    },
    async logoutUser({ }) {
        try {
            await fireAuth.signOut()
        } catch (error) {
            alert(error.message)
        }
    },
    handleAuthChanges({ commit, dispatch, state }) {
        fireAuth.onAuthStateChanged((user) => {
            if (user) {
                // Logged in
                let uid = fireAuth.currentUser.uid
                fireDb.ref(`users/${uid}`).once('value', snapshot => {
                    let userDetails = snapshot.val()
                    commit('setUserDetails', {
                        name: userDetails.name,
                        email: userDetails.email,
                        dp: userDetails.dp,
                        uid: uid,
                    })
                })
                dispatch('firebaseUpdateUser', {
                    uid: uid,
                    updates: {
                        online: true
                    }
                })
                this.$router.replace("/")
            }
            else {
                //Logged out
                dispatch('firebaseUpdateUser', {
                    uid: state.userDetails.uid,
                    updates: {
                        online: false
                    }
                })
                commit('setUserDetails', {})
                this.$router.replace("/auth")
            }
        })
    },
    firebaseUpdateUser({},payload){
        fireDb.ref(`users/${payload.uid}`).update(payload.updates)
    }
}

const getters = {

}

export default {
    namespaced: true,
    state, mutations, actions, getters
}
