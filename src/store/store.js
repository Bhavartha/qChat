import { fireAuth, fireDb } from "boot/firebase"

const state = {
    userDetails: {}
}

const mutations = {
    setUserDetails(state, payload) {
        state.userDetails = payload
    }
}

const actions = {
    async registerUser({ commit }, payload) {
        try {
            await fireAuth.createUserWithEmailAndPassword(payload.email, payload.password)
            let uid = fireAuth.currentUser.uid
            fireDb.ref(`users/${uid}`).set({
                name: payload.name,
                email: payload.email,
                online: true,
            })
        } catch (error) {
            alert(error.message)
        }
    },
    async loginUser({ commit }, payload) {
        try {
            await fireAuth.signInWithEmailAndPassword(payload.email, payload.password)
        } catch (error) {
            alert(error.message)
        }
    },
    handleAuthChanges({ commit }) {
        fireAuth.onAuthStateChanged((user) => {
            if (user) {
                // Logged in
                let uid = fireAuth.currentUser.uid
                fireDb.ref(`users/${uid}`).once('value', snapshot => {
                    let userDetails = snapshot.val()
                    commit('setUserDetails', {
                        name: userDetails.name,
                        email: userDetails.email,
                        uid: uid,
                    })
                })
            }
            else {
                //Logged out
                commit('setUserDetails', {})
            }
        })
    }
}

const getters = {

}

export default {
    namespaced: true,
    state, mutations, actions, getters
}
