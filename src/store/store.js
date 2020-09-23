import Vue from 'vue'
import { fireAuth, fireDb, fireStorage } from "boot/firebase"

const state = {
    userDetails: {},
    users: {}
}

const mutations = {
    setUserDetails(state, payload) {
        state.userDetails = payload
    },
    addUser(state, payload) {
        Vue.set(state.users, payload.uid, payload.userDetails)
    }
}

const actions = {
    registerUser({ }, payload) {
        fireAuth.createUserWithEmailAndPassword(payload.email, payload.password)
            .then((res) => {
                let uid = fireAuth.currentUser.uid;
                fireDb.ref(`users/${uid}`).set({
                    name: payload.name,
                    email: payload.email,
                    online: true,
                    dp: "https://firebasestorage.googleapis.com/v0/b/qchat-49362.appspot.com/o/DP%2Fdefault-profile-picture.png?alt=media&token=b4647306-18e3-4f38-aa44-f13cddb71355",
                })
            })
            .catch((error) => {
                alert(error.message)
            })
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
                fireDb.ref(`users/${uid}`).once('value', (snapshot) => {
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
                dispatch('firebaseGetUsers')
                this.$router.replace("/", () => { })
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
                this.$router.replace("/auth", () => { })
            }
        })
    },
    firebaseUpdateUser({ }, payload) {
        if (payload.uid) {
            fireDb.ref(`users/${payload.uid}`).update(payload.updates)
        }
    },
    firebaseGetUsers({ commit }) {
        fireDb.ref("users").on("child_added", snapshot => {
            let uid = snapshot.key
            let userDetails = snapshot.val()
            console.log(uid, userDetails);
            commit('addUser', {
                uid, userDetails
            })
        })
    }
}

const getters = {
    users: state => { return state.users }
}

export default {
    namespaced: true,
    state, mutations, actions, getters
}
