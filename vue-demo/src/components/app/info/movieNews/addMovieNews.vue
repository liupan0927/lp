<template>
	<div>
		<el-form :model="form" :rules="rules" ref="form">
		    <el-form-item label="资讯标题" :label-width="formLabelWidth" prop="title">
		      <el-input v-model="form.title" class="width" auto-complete="off" placeholder="同一电影下相同资讯类型标题要一致"></el-input>
		      <span v-if="news.isSuccess == 'titleNotExit'" style="color:red">同一电影下相同资讯类型标题要一致</span>
		    </el-form-item>
		    <el-form-item label="选择电影" :label-width="formLabelWidth" prop='movieId'>
			    <el-select v-model="form.movieId" placeholder="请选择电影" >
			        <el-option v-for="(item,index) in news.moviesData" :key="'news.moviesData'+index" :label="item.cName" :value="item._id"></el-option>
			    </el-select>
			</el-form-item>

			<el-form-item label="资讯类型" :label-width="formLabelWidth" prop='type'>
			    <el-select v-model="form.type" placeholder="请选择资讯类型" >
			        <el-option label="类型1" value="1"></el-option>
			        <el-option label="类型2" value="2"></el-option>
			    </el-select>
			</el-form-item>

		   	<el-form-item style="margin-left: 50px;">
		   		<span style="color:red">*</span>
			    <el-button type="primary" @click="select" icon="el-icon-search">选择图片</el-button>
			    <span v-if="form.imgId == ''" style="color:red">未选择图片</span>
			    <span v-if="news.isSuccess == 'fail'" style="color:red">图片已被选择请重新选择</span>
			    <span v-else></span>
			</el-form-item>
			<el-form-item label="相关内容" :label-width="formLabelWidth" >
		      <el-input v-model="form.content" style="width:400px" auto-complete="off" type="textarea" :autosize="{ minRows: 2, maxRows: 6}"></el-input>
		    </el-form-item>
			
			<el-form-item style="margin-left: 190px;">
			    <el-button @click="submitForm('form')" round>保存</el-button>
			    <el-button @click="delForm('form')" round>重置</el-button>
			</el-form-item>
		 </el-form>

		
		<el-dialog title="选择图片" :visible.sync="dialogFormVisible" :dialogFormVisible="dialogFormVisible"  >
			<el-row :gutter="20" >
			  <el-col :span="4"  v-for="(item,index) in news.imgData" :key="'news.imgData'+index" style="margin-bottom:15px">
			  		<el-radio v-model="form.imgId" :label="item._id" >
			  			<img  class=""  :src="'http://127.0.0.1:3000/'+item.url" height="100" width="100"/>
			  		</el-radio>
			  </el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="cancel">取 消</el-button>
			    <el-button type="primary" @click="sure">确 定</el-button>
			</div>
		</el-dialog>
		<div ref="isSuccess" style="display:none">{{news.isSuccess}}</div>
		
	</div>
</template>
<script>
	import axios from "axios";
	export default {
		name: "addMovie",
		data() {
			var checkName = (rule, value, callback) => {
				if (value == '' || value == undefined) {
					callback(new Error('请输入资讯标题'));
				} else {
					callback();
				}
			};
			var checkMovie = (rule, value, callback) => {
				if (value == '' || value == undefined) {
					callback(new Error('请选择电影'));
				} else {
					callback();
				}
			}
			return {
				form: {
					_id:"",
					title:"",
					type:"1",//资讯类型初值
					imgId:''
		        },
		        formLabelWidth: '120px',
		        rules: {
					title: [{
						required: true, 
						validator: checkName,
						trigger: 'blur'
					}],
					movieId:[{
						required: true, 
						validator: checkMovie,
						trigger: 'change'
					}]
				},
				src:"http://127.0.0.1:3000/images/movies/b9a26bd97e522.jpg@750w_1l",
				label:"",
				dialogFormVisible:false,
				selectImg:"1",
				
				//radio:""//按钮初始值
			}
		},
		created() {
			this.$store.state.news.isSuccess = "123";
			this.getMoviesInfo();
			
			console.log(this.$store.state.news.moviesData,"ooooo")//空
			
		},
		computed: {
			news() {
				
		    	return this.$store.state.news
		    },
		},
		updated() {

			// console.log(this.news.isSuccess,"updated")
			if(this.news.isSuccess == "ok"){//因为此时节点有更新，即选择图片按钮右侧拿的数据，渲染 如果没有这次渲染 就不会打印最后一次更新，即保存
				this.message("保存成功！","success");
				this.news.isSuccess = "123";
			}
		},
		methods:{
			message(content, type) {
				this.$message({
		          	message: content,
		          	type: type
		        });
			},
			delForm(formName) {
				this.form.content = '';
			},
			submitForm(formName) {
				console.log(formName,this.form)
				if(this.form.imgId){
	          		this.selectImg = "1";
	          		
	          	}else {
	          		// this.message("请选择一张图片！", "warning")//对的
	          		this.selectImg = "";
	          	}
				this.$refs[formName].validate((valid) => {
		          if (valid && this.selectImg == "1") {
		          	this.$store.dispatch("news/asyncSave",this.form);
		          	// console.log(this.$refs.isSuccess.innerHTML,"44") 
		            // if(this.news.isSuccess == "ok") {
		            // 	this.message("保存成功！","success");
		            // }else {
		            // 	this.message("图片已被选择，请重新选择！", "warning");
		            // }
		          } else {
		            return false;
		          }
		        });
			},
			
			
			select(){
				
				this.dialogFormVisible = true;
				this.getImg();
			},
			getMoviesInfo() {
				console.log("[[")
				this.$store.dispatch("news/asyncGetMovieInfoByPage");
				
			},
			getImg() {
				this.$store.dispatch("news/asyncGetImgByMovieId",{
					movieId:this.form.movieId,//电影id
				});
			},
			cancel() {
				this.form.imgId = "";
				this.dialogFormVisible = false;
			},
			sure() {
				//验证是否重复 。。暂时搁置
				this.dialogFormVisible = false;

			}

		}
	}
</script>
<style>
	.width{
		width: 300px
	}

</style>
