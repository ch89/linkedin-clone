import { createStore } from 'vuex'

export default createStore({
	state: {
		user: null
	},
	mutations: {
		auth(state, user) {
			state.user = user
		}
	},
	actions: {
	},
	modules: {
	}
})
