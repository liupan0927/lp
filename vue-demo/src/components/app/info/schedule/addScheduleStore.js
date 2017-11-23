import axios from "axios"

export default {
	namespaced:true,
	state: {
		curPage: 1,
		eachPage: 10,
		maxPage: 0,
		count: 0,
		rows:999,
		movies: [],
		studios:[],
		theaters:[],
		studioList:[],
		theaterList:[],
		seatingList:[]
	},
	mutations: {

		getMovies(state, data) {
			state.movies = data
		},
		getStudios(state, data) {
			state.studios = data
		},
		getTheaters(state,_id) {
			console.log(_id)
			state.studios.some((item) => {
				if (item._id === _id) {
					state.theaters = item.theaters
				}
				
			})
		},
		getStudiosByMovieId(state, data) {
			state.studioList = data
		},
		getTheaterByStudioId(state, data) {
			state.theaterList = data
		},
		getSeatingsByScheduleId(state, data) {
			state.seatingList = data
		},
		delStudioList(state) {
			state.studioList
		},
		delTheaterList(state) {
			state.theaterList
		},
		buy(state) {
			state.seatingList
		}
	},
	actions: {
		async getMovies(context) {
			console.log("in")
			const {data} = await axios.get(`/movies/getMovies`,{
					params:{
						curPage:1,
						eachPage:999
					}
			})
			console.log(data)
			context.commit("getMovies", data.data)
		},
		async getStudios(context) {
			const {data} = await axios.get(`/studio/getStudios`, {
					params:{
						curPage:1,
						eachPage:999
					}
			})
			console.log(data)
			context.commit("getStudios", data.rows)
		},
		async addSchedule(context,addInfo) {
			// console.log(addInfo.value)
			const {data} = await axios.post(`/schedule/addSchedule`, {		
					movieId:addInfo.value,
					studioId:addInfo.value1,
					theaterId:addInfo.value2,
					showTime:addInfo.value3,
					price:addInfo.input				
			})
		},
		async getStudiosByMovieId(context,value) {
			const {data} = await axios.get(`/schedule/getStudiosByMovieId`, {
					params:{
						movieId:value
					}
			})
			console.log(data)
			context.commit("getStudiosByMovieId", data.rows)
		},
		async getTheaterByStudioId(context,text) {
			console.log(text)
			const {data} = await axios.get(`/schedule/getTheaterByStudioId`, {
					params:{
						movieId:text.value,
						studioId:text.value1,
						showTime:text.value3
					}
			})
			console.log(data)
			context.commit("getTheaterByStudioId", data.rows)
		},
		async getSeatingsByScheduleId(context,text) {
			console.log(text)
			const {data} = await axios.get(`/schedule/getSeatingsByScheduleId`, {
					params:{
						scheduleId:text._id
						
					}
			})
			console.log(data)
			context.commit("getSeatingsByScheduleId", data.rows)
		},
		async buy(context,text) {
			console.log(text)
			const {data} = await axios.post(`/schedule/buy`, {
					_id:text._id,
					state:1
			})
			console.log(data)
			context.commit("buy", data.rows)
		},
		async delStudioList(context,text) {
			console.log(text)
			const {data} = await axios.post(`/schedule/delStudioList`, {
					studioId:text.value1,
					movieId:text.value
			})
			console.log(data)
			context.commit("delStudioList", data.rows)
		},
		async delTheaterList(context,text) {
			console.log(text)
			const {data} = await axios.post(`/schedule/delTheaterList`, {
					_id:text._id,
					status:0
			})
			console.log(data)
			context.commit("delTheaterList", data.rows)
		}
	},

}