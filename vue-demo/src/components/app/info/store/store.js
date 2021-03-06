import studioStore from "../studio/studioStore.js"
import theaterStore from "../theater/theaterStore.js"
import Vue from "vue";
import Vuex from "vuex";
import movie from '@/components/app/info/movie/movieStore';
import img from '@/components/app/info/img/imgStore';
import news from '@/components/app/info/movieNews/movieNewsStore';
import addScheduleStore from "../schedule/addScheduleStore.js"
Vue.use(Vuex);
export default new Vuex.Store({
	modules:{
		movie,
		img,
		news,
		studioStore,
		theaterStore,
		addScheduleStore
	}
})