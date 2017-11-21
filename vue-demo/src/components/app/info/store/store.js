import Vue from "vue"
import Vuex from "vuex"

import studioStore from "../studio/studioStore.js"

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		studioStore
	}
})