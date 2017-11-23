import axios from "axios"
export default {
	namespaced: true,
	state: {
		curPage: 1, 
		eachPage: 10,
		maxPage: 0,
		count: 0,
		seatsCount:0,
		data: [],
		input: {
			name: '1号厅',
			rowNo: '9',
			colNo:'9',
			studioId:"59e70d98efcbe64370e29a08"
			},
		theaterId:null,
		seats:[],
		ScurPage: 1,
		SeachPage: 10,
		SmaxPage: 0,
		updata:{
			name:null
		}
	},
	mutations: {
		getTheater(state, {total,rows}) {
			// Object.assign(state, {total,rows})
			state.data=rows
			state.count=total
		},
		getSeat(state, {total,rows}) {
			// Object.assign(state, {total,rows})
			state.seats=rows
			state.seatsCount=total
		},
		setStudioId(state,page){
			state.input.studioId=page
		},
		setTheaterId(state,page){
			 state.theaterId=page
		},
		setUpdata(state,page){
			state.updata.name 

=page
		}

	},

	actions: {

		async getTheaterAsync(context, {curPage = this.state.curPage, eachPage = 7} = {}) {
				const {studioId}=this.state.addTheaterStore.input
			const {data} = await axios.get("/theater/getTheater", {
				params: {
					curPage,
					eachPage,
					studioId,
				}
			})
			console.log(data)
			context.commit("getTheater", data)
		},

		async addTheaterAsync(context){
			const {name,rowNo,colNo,studioId}=this.state.addTheaterStore.input
			const {data}=await axios.post("/theater/addTheater", {
				name,rowNo,colNo,studioId
			})
			context.dispatch("getTheaterAsync", data)
			console.log(data)
		},

		async getSeatAsync(context, {curPage = this.state.addTheaterStore.ScurPage, eachPage = 10} = {}) {
				const theaterId=this.state.addTheaterStore.theaterId
			    const {data} = await axios.get("/seat/getSeat", {
				params: {
					curPage,
					eachPage,
					theaterId,
				}
			})
			console.log(data)
			context.commit("getSeat", data)
		},

		 
		async theaterDeleteAsync(context){
			const _id=this.state.addTheaterStore.theaterId
			const {studioId}=this.state.addTheaterStore.input
			const {data}=await axios.post("/theater/theaterDelete", {
				 _id,studioId
			})
			context.dispatch("getTheaterAsync", data)
		},

		async theaterUpdateAsync(context){
			const _id=this.state.addTheaterStore.theaterId
			const {name}=this.state.addTheaterStore.updata
			const {data}=await axios.post("/theater/theaterUpdate", {
				 _id,name
			})
			context.dispatch("getTheaterAsync", data)
		},

	}
}