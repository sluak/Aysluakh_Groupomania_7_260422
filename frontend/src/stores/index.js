import { createStore } from 'vuex'

export default createStore({
    actions: {
        updateUser({ commit }, user) {
            commit('setUser', { user, userId: user.id })
        }
    },
    mutations: {
        setUser(state, { user, userId }) {
            const userIndex = state.users.findIndex(user => user.id === userId)
            state.users[userIndex] = user
        },
    }
})
