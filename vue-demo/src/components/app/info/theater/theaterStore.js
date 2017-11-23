import axios from "axios"

export default {
	namespaced: true,
	state: {
		theaterList: []
	},
	
	mutations: {
		getTheaters(state,data){
			state.theaterList=data.data
		}
	},
	actions: {
		// 新增影厅
		async asyncAddTheater(context,theater) {
			const data = await axios.post("/theater/addTheater",theater)
			// console.log(data)
		}, 
		// 获取影厅列表
		async asyncGetTheaterByPage(context,id) {
			let data = await axios.get("/theater/getTheaters",{params: {
				studioId: id.id,
				page: id.page
			}})
			context.commit("getTheaters",data)
		},
		// 删除影厅
		async asyncRemoveTheater(context,id) {
			let data = await axios.post("/theater/removeTheater",id)
		},
		// 修改影厅
		async asyncUpdateTheater(context,data) {
			console.log(data)
			let result = await axios.post("/theater/updateTheater",data)
			console.log(result,"修改")
		},
		async asyncRemoveSeat(context,id) {
			let data = await axios.post("/seat/removeSeatBySeatId",id)
			console.log(data,"座位删除")
		}
	}
}