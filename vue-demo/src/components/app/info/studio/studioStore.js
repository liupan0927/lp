import axios from "axios"
export default {
	state: {
		studioList: []
	},
	
	mutations: {
		getStudios(state,data){
			state.studioList=data.data.rows
		}
	},
	actions: {
		async asyncAdd(context,info) {
			const data = await axios.post("/studio/addStudio",info)
		}, 
		async asyncGetStudiosByPage(context) {
			let data = await axios.get("/studio/getStudios")
			context.commit("getStudios",data)
		},
		async asyncRemoveStudio(context,id) {
			let data = await axios.post("/studio/removeStudio",{_id:id})
		}
	}
}