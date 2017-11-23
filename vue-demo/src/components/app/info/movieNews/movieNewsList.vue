<template>
	<div>
		<div style="display:flex;align-items: center;margin-bottom:25px">
			<span style="color:deeppink"> 电影名：</span>
			<el-input
				style="width:200px"
			    placeholder="请输入电影中文名"
			    prefix-icon="el-icon-search"
			    v-model="findData.inputName">
			</el-input>
			
			<el-button type="primary" style="margin-left:35px" @click="aboutFind">查询</el-button>
		</div>
		<el-table
			@row-dblclick="doubleClick"
		    :data="data1.newsData"
		    border
		    style="width: 1241px;">
		    <el-table-column
		      
		      prop="movieId.cName"
		      label="电影名称"
		      width="100">
		    </el-table-column>
		    <el-table-column
		      prop="title"
		      label="资讯标题"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      prop="type"
		      label="资讯类型"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      :formatter="formatContent"
		      prop="imgs[0].imgComment"
		      label="资讯内容"
		      class="text"
		      show-overflow-tooltip
		      width="400">
		    </el-table-column>
		    <el-table-column
		      prop="imgs[0].url"
		      empty-text="无"
		      label="涉及图片"
		      :formatter="formatImg"
		      width="120">
		    </el-table-column>

		    <el-table-column
		     
		      label="操作"
		      width="200">
		      <template slot-scope="scope">
		      	<el-button @click='change(scope.row)' type="text" size="small">修改</el-button>
		        <el-button @click="del(scope.row._id)" type="text" size="small">删除</el-button>
		      
		       
		      </template>
		    </el-table-column>
		  </el-table>
		  <el-pagination

		      @size-change="eachNumbers"
		      @current-change="nowPage"
		      :current-page="~~data1.curPage"
		      :page-sizes="[6, 8, 10, 12]"
		      :page-size="~~data1.eachPage"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="data1.count">
		    </el-pagination>


			
		    <el-dialog :title="title" :visible.sync="dialogFormVisible" :dialogFormVisible="dialogFormVisible"  >
			  <el-form :model="form" :rules="rules" ref="form">
			    <el-form-item label="资讯标题" :label-width="formLabelWidth" prop="title" >
			      <el-input v-model="form.title" class="width" auto-complete="off" :disabled="disabled" ></el-input>
			    </el-form-item>
			    <el-form-item label="选择电影" :label-width="formLabelWidth" prop='movieId'>
				    <el-select v-model="form.movieId.cName" placeholder="请选择电影" :disabled="true">
				        <el-option v-for="(item,index) in data1.moviesData" :key="'news.moviesData'+index" :label="item.cName" :value="item._id"></el-option>
				    </el-select>
				</el-form-item>

				<el-form-item label="资讯类型" :label-width="formLabelWidth" prop='type' >
				    <el-select v-model="form.type" placeholder="请选择资讯类型" :disabled="disabled" >
				        <el-option label="类型1" value="1"></el-option>
				        <el-option label="类型2" value="2"></el-option>
				    </el-select>
				</el-form-item>


			   	<el-form-item style="margin-left: 50px;" v-if="flag">
			   		<span style="color:red">*</span>
				    <el-button type="primary" @click="select" icon="el-icon-search" :disabled="disabled">选择图片</el-button>

				    <span v-if="data1.isSuccess == 'fail'" style="color:red">选择的图片已存在</span>
				    <span v-else></span>
				</el-form-item>
				<el-form-item style="margin-left: 50px;" v-else>
				    相关图片：<img  class=""  :src="src" height="200" width="200"/>
				</el-form-item>


				<el-form-item label="相关内容" :label-width="formLabelWidth" >
			      <el-input :disabled="disabled" v-model="form.imgs[0].imgComment" style="width:400px" auto-complete="off" type="textarea" :autosize="{ minRows: 2, maxRows: 6}"></el-input>
			    </el-form-item>
			 </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="cancel">取 消</el-button>
			    <el-button type="primary" @click="submitForm('form')">确 定</el-button>
			  </div>
			</el-dialog>


			<el-dialog title="选择图片" :visible.sync="dialogFormVisibleImg" :dialogFormVisible="dialogFormVisibleImg"  >
				<el-row :gutter="20" >
				  <el-col :span="4"  v-for="(item,index) in data1.imgData" :key="'news.imgData'+index" style="margin-bottom:15px">
				  		<el-radio v-model="form.imgs[0]._id" :label="item._id" @change="selectRadio">
				  			<img  class=""  :src="'http://127.0.0.1:3000/'+item.url" height="100" width="100"/>
				  		</el-radio>
				  </el-col>
				</el-row>
				<div slot="footer" class="dialog-footer">
				    <el-button @click="cancel">取 消</el-button>
				    <el-button type="primary" @click="selectSureImg">确 定</el-button>
				</div>
			</el-dialog>

	</div>
</template>
<script>
	// let pageNums = document.getElementById("pageNums");
	import axios from "axios";
	export default {
		name: "newsList",
		data() {
			var checkName = (rule, value, callback) => {
				if (value == '' || value == undefined) {
					callback(new Error('请输入资讯标题'));
				} else {
					callback();
				}
			};
			return {
		        dialogFormVisible: false,
		        dialogFormVisibleImg: false,
		        form: {
		        	preImgId:"",
		        	
		         	movieId:{},
		         	imgs:[{imgComment:"",_id:""}],
		        },
		        
		        formLabelWidth: '120px',
		        rules: {
					title: [{
						required: true, 
						validator: checkName,
						trigger: 'blur'
					}],
				},
				title:"",
				disabled:false,
				src:"",
				flag:true,//是否详细信息显示图片按钮
				findData:{}
		     
			}
		},
		created() {
			this.getInfoByPage();
			
		},
		computed:{
		    // 第一种
		    data1() {
		    	
		    	const data = this.$store.state.news;
		    	
		      	return data
		    },

		    curPage: {
			    get () {
			    	
			      return this.$store.state.news.curPage//this.$store.state.obj.curPage
			    },
			    set (value) {
			      
			      this.nowPage(value);
			    }
			}
		},
		updated() {
			
			if(this.data1.isSuccess == "ok"){//因为此时节点有更新，即选择图片按钮右侧拿的数据，渲染 如果没有这次渲染 就不会打印最后一次更新，即保存
				this.message("保存成功！","success");
				this.data1.isSuccess = "123";
				this.dialogFormVisible = false;
				this.getInfoByPage();
			}
		},
		methods: {
			aboutFind() {
				this.findData = {
					name:this.findData.inputName,
				}
				this.getInfoByPage();
			},
			selectRadio(e) {
				// console.log(e,"e")
				// this.form.preImgId = e;
			},
			message(content, type) {
				this.$message({
		          	message: content,
		          	type: type
		        });
			},
			getImg() {
				this.$store.dispatch("news/asyncGetImgByMovieId",{
					movieId:this.form.movieId._id,//电影id
				});
			},
			selectSureImg() {
				
				this.dialogFormVisibleImg = false;
				
			},
			select() {
				
				console.log()
				this.dialogFormVisibleImg = true;
			
				this.getImg();
				
			},
			formatImg(row, column) {
				// console.log(row.imgs[0])
		    	// var img = row[column.property];
		    	// if(row.imgs[0] != undefined){
		    		var img = row.imgs[0].url;
			    	var src1 = "http://127.0.0.1:3000/" + img;
			    	return ( <img src={src1} style="width:100px;height:100px" class="image"/>)
		    	// }else{
		    	// 	return (<span>无</span>)
		    	// }
		    },
		    formatContent(row, column) {
		    	
		    	if(row.imgs[0] != undefined){
		    		if(row.imgs[0].imgComment) {
		    			return (<span>{row.imgs[0].imgComment}</span>)
		    		}else {
		    			return (<span>无</span>)
		    		}
			    	
		    	}else {
		    		return (<span>无</span>)
		    	}
		    },
			doubleClick(row, event) {
				console.log(row,event)
				this.flag = false;
				this.dialogFormVisible = true;
				// if(row.imgs[0] != undefined){//评论和url有一个
		  //   		if(row.imgs[0].imgComment && row.imgs[0].url) {//有评论有url
		  //   			console.log("00000000000000")
		  //   			this.form = row;
		  //   		}else if(row.imgs[0].imgComment == undefined && row.imgs[0].url){//无评论有url
		  //   			Object.assign(this.form, row, {
				// 			imgs:[{imgComment:"",url:row.imgs[0].url}]
				// 		});
		  //   		}
		  //   // 		else {
		  //   // 			//有评论无url不可能（数据库设计，是图片评论！！）  所有要判断必须有一张图
		  //   // 			console.log("有评论无url")
		  //   // 			Object.assign(this.form, row, {
				// 		// 	imgs:[{imgComment:row.imgs[0].imgComment,url:""}]
				// 		// });
		  //   // 		}
		  //   	}
		  //  //  	else {//评论和url都没有
		  //  //  		Object.assign(this.form, row, {
				// 	// 	imgs:[{imgComment:"",url:""}]
				// 	// });
		  //  //  	}
				this.form = row;
				this.title = "详细信息";
				this.disabled = true;
				console.log(this.form,"this.form",row)
				var imgUrl = row.imgs[0].url; 
				this.src = "http://127.0.0.1:3000/" + imgUrl;
			},
			cancel() {
				this.getInfoByPage();
				this.dialogFormVisible = false;
			},
			submitForm(formName) {
				console.log(formName)
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		            //修改数据传入后台
		            //_id,movieId,imgId,title,type,content
		            const changData = {
		            	_id:this.form._id,
		            	movieId:this.form.movieId._id,
		            	imgId:this.form.imgs[0]._id,
		            	title:this.form.title,
		            	type:this.form.type,
		            	content:this.form.imgs[0].imgComment,
		            	preImgId:this.form.preImgId
		            }
		            console.log(changData.imgId,"imgId")
		            console.log(changData.preImgId,"preImgId")
		            this.$store.dispatch("news/asyncSave",changData);
		            
		          } else {

		            console.log('error submit!!');
		            return false;
		          }
		        });
			},
			change(row) {
				console.log(row,"row==================")
				this.flag = true;
				this.dialogFormVisible = true;
				
				this.form = row;
				this.form.preImgId = this.form.imgs[0]._id;
				this.title = "修改";
				this.disabled = false;
			},
			getInfoByPage(curPage = this.$store.state.news.curPage,eachPage = this.$store.state.news.eachPage,findData = this.findData) {//=号后面是默认值
				console.log("pp",this.$store.state.news.curPage);
				this.$store.dispatch("news/asyncGetNewsInfoByPage", {curPage : curPage, eachPage : eachPage,findData : findData});
			},
			eachNumbers(eachPage){
				console.log()
				this.getInfoByPage(1,eachPage);
			},
			// nowPage(){
			// 	console.log()
			// 	this.getInfoByPage(~~curPage.options[curPage.selectedIndex].text,~~pageNums.options[pageNums.selectedIndex].text);
			// },
			nowPage(curPage, eachPage){
				console.log(curPage,"curPage")
				console.log(this.eachPage,"this.eachPage")
				eachPage = this.$store.state.news.eachPage || 10;
				this.getInfoByPage(~~curPage,eachPage);
			},
			del(_id){
				console.log(_id,"_id")
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$store.dispatch("news/asyncDel", {
						id: _id
					});
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.getInfoByPage();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
		}
	}
</script>
<style>

	.width{
		width: 300px
	}
	.text>div{
		// overflow: hidden;
	 //    text-overflow: ellipsis;
	 //    display: -webkit-box;
	 //    -webkit-line-clamp: 4;//（行数）
	 //    -webkit-box-orient: vertical;
	}

</style>