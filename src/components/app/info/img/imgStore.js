
import axios from 'axios'

export default {
	namespaced: true,
	state: {
		fileList:[]
	},
	
	getters: {
		
	},
	
	mutations:{
		getImgInfo(state,imgInfo) {
			

			for(let i = 0; i < imgInfo.rows.length; i++){
				console.log()
				state.fileList.push({
					name:imgInfo.rows[i].name,
					url:"http://127.0.0.1:3000/" + imgInfo.rows[i].url,
					_id:imgInfo.rows[i]._id,
					preUrl: imgInfo.rows[i].url
				})
			}

		},
		
	},
	
	actions: {
		
		async getImgInfoByMovieIdAndType(context, {id,type}) {
			const imgInfo = await fetch("http://127.0.0.1:3000/imgs/getImgsByMoviesId?type=" + type + "&movieId=" + id,{
        		method: "GET",     
			})
			.then(function(res) {
			    return res.json()
			})
			context.commit("getImgInfo", imgInfo)
			
		},
		handleRemove(context,{file,movieId}) {
			fetch('http://127.0.0.1:3000/files/delImgsInfo',{
		        method: "POST",
		        headers: {
		           'Content-Type': 'application/x-www-form-urlencoded'
		        },
		        mode: 'cors',
		        credentials: 'credentials',
		        cache: 'default',
		        body: "movieId=" + movieId + "&_id=" + file._id + "&url=" + file.preUrl
		     })
		},
	}
}

