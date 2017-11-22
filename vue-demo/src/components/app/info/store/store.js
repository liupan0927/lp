import Vue from "vue"
import Vuex from "vuex"

import studioStore from "../studio/studioStore.js"
import theaterStore from "../theater/theaterStore.js"


Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		studioStore,
		theaterStore
	}
})