
import axios from 'axios'

export default {
	namespaced: true,
	state: {
		curPage: 1,
		eachPage: 10,
		maxPage: 0,
		count: 0,
		newsData: [],
		moviesData: [],
		imgData:[],
		isSuccess:"123"
	},
	
	getters: {
		
	},
	
	mutations:{
		getMovieInfoByPage(state,data) {
			state.moviesData = data.rows;
			
		},
		getNewsInfoByPage(state,data) {
			state.newsData = data.rows;
			state.maxPage = data.maxPage;
			state.curPage = data.curPage;
			state.count = data.total;
			state.eachPage = data.eachPage;
			console.log(data,"data")
		},
		getImgByMovieId(state,data) {
			state.imgData = data.data[0].imgs;
			
		},
		save(state, data) {
			console.log(data,"data============")
			state.isSuccess = data.state;
			console.log(state.isSuccess)
		}
		
	},
	
	actions: {
		async asyncGetNewsInfoByPage(context,{curPage = this.state.movie.curPage, eachPage = this.state.movie.eachPage, findData}) {
			var name = findData.name || "";
			const NewsInfo = await axios.get("/newss/getNewsInfo", {
				params:{
					page:curPage,
					rows:eachPage,
					name,
				}
			})
			console.log(NewsInfo,"NewsInfo")
			context.commit("getNewsInfoByPage", NewsInfo.data)
		},
		async asyncGetMovieInfoByPage(context) {
			
			const movieInfo = await axios.get("/movies/getMoviesInfo", {
				params:{
					page:1,
					rows:999,
					name:"",
					country:"",
					state:"",
				}
			})
			
			context.commit("getMovieInfoByPage", movieInfo.data)
		},
		async asyncGetImgByMovieId(context,{movieId}) {
			
			const imgInfo = await axios.get("/movies/getMoviesInfoByTypeAndId",{
				params:{
					movieId,
					type:"5",
					curPage:1,
					eachPage:999
				}
				
			})
			context.commit("getImgByMovieId", imgInfo.data)
			console.log(imgInfo,"imgInfo")
		},
		async asyncSave(context,{_id,movieId,imgId,title,type,content,preImgId}) //没给初值
		{
			await axios.post("/newss/saveNewsInfo",{_id,movieId,imgId,title,type,content,preImgId})
				.then(function(response){
					console.log(response,"response")
					context.commit("save", response.data)
				})
			
		},
		async asyncDel(context,{id}) {
			
			await axios.post("/newss/delNewsInfo",{
					_id:id
			})
			
		}
	}
}

