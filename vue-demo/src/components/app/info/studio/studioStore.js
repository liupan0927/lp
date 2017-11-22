import axios from "axios"
export default {
	namespaced: true,
	state: {
		studioList: []
	},
	
	mutations: {
		getStudios(state,data){
			state.studioList=data.data
		}
	},
	actions: {
		async asyncAdd(context,info) {
			// 修改
			if(info.updateId){
				const data = await axios.post("/studio/updateStudio",info)
			}
			// 新增
			else{
				const data = await axios.post("/studio/addStudio",info)
			}

		}, 
		// 获取影院数据
		async asyncGetStudiosByPage(context,page) {
			console.log(page,"curPage")
			let data = await axios.get("/studio/getStudios",{
				params: {
					page: page
				}
			})
			// console.log(data,"back")
			context.commit("getStudios",data)
		},
		// 删除影院
		async asyncRemoveStudio(context,id) {
			let data = await axios.post("/studio/removeStudio",{_id:id})
		}
	}
}