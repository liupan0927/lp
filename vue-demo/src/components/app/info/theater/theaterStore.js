import axios from "axios"

export default {
	namespaced: true,
	state: {
		theaterList: []
	},
	
	mutations: {
		getTheaters(state,data){
			// const result = data.data.rows
			// for(let key in result) {
			// 	state.theaterList[key] = result[key]
			// }
			state.theaterList=data.data
		}
	},
	actions: {
		async asyncAddTheater(context,theater) {
			const data = await axios.post("/theater/addTheater",theater)
			// console.log(data)
		}, 
		async asyncGetTheaterByPage(context,id) {
			let data = await axios.get("/theater/getTheaters",{params: {
				studioId: id.id,
				page: id.page
			}})
			context.commit("getTheaters",data)
		},
		async asyncRemoveTheater(context,id) {
			console.log(id)
			let data = await axios.post("/theater/removeTheater",id)
		},
		async asyncRemoveTheater(context,id) {
			console.log(id)
			let data = await axios.post("/theater/updateTheater",id)
		}
	}
}