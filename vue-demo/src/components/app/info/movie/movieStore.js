
import axios from 'axios'

export default {
	namespaced: true,
	state: {
		curPage: 1,
		eachPage: 10,
		maxPage: 0,
		count: 0,
		data: [],
	},
	getters: {
		
	},
	
	mutations:{
		getInfoByPage(state,data) {
			
			//第一种方法
			state.data = data.rows;
			state.maxPage = data.maxPage;
			state.curPage = data.curPage;
			state.count = data.total;
			state.eachPage = data.eachPage;
			
			// //第二种方法
			// for(var key in data){
			// 	state[key] = data[key];
			// }
			//第三种方法
			// Object.assign(state, data);
		},
		add(state,_id){
			state.data._id = _id;
			
		},
		
	},
	actions: {
		async asyncGetInfoByPage(context,{curPage = this.state.movie.curPage, eachPage = this.state.movie.eachPage, findData}) {//=后为初值
			console.log(findData,"findData")
			var name = findData.name || "";
			var country = findData.country || "";
			var state = findData.state || "";
			const movieInfo = await axios.get("/movies/getMoviesInfo", {
				params:{
					page:curPage,
					rows:eachPage,
					name,
					country,
					state,
				}
			})
			
			context.commit("getInfoByPage", movieInfo.data)
		},
		async asyncSave(context,{cName,eName,type,country,duration,release,synopsis,state,_id,grade}) //没给初值
		{
			
			const {data} = await axios.post("/movies/saveMoviesInfo",{cName,eName,type,country,duration,release,synopsis,state,_id,grade});
			
			context.commit("add", data._id)
		},
		async asyncDel(context,{id}) {
			
			await axios.post("/movies/delMoviesInfo",{
					_id:id
			})
			
		},
		// async asyncAboutFind(context,{}) {
		// 	// await axios.get("")
		// }
	}
}

