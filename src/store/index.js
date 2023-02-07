import { createStore } from "vuex"

export default createStore({
	state() {
		return {
			user: null,
			follows: []
		}
	},
	mutations: {
		auth(state, user) {
			state.user = user
		},
		follows(state, follows) {
			state.follows = follows
		}
	}
})