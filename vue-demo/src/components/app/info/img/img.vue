<template>
	<div style="margin-left:60px">
		
		<el-dropdown size="medium" split-button type="primary"  @command="handleCommand">
		  {{this.typeName}}
		  <el-dropdown-menu slot="dropdown">
		    <el-dropdown-item command="1">主页图片</el-dropdown-item>
		    <el-dropdown-item command="2">封面图片</el-dropdown-item>
		    <el-dropdown-item command="3">演职人员</el-dropdown-item>
		    <el-dropdown-item command="4">图集</el-dropdown-item>
		    <el-dropdown-item command="5">资讯图片</el-dropdown-item>
		    <el-dropdown-item command="6">剧情图片</el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
		<el-upload
			  style="margin-top:60px;width: 320px;"
			  class="upload-demo"
			  :multiple="multiple"
			  :before-upload="beforeUpload"
			  action="http://localhost:3000/files/upload2"
			  name="importfile"
			  :data="upLoadData"
			  :on-preview="handlePreview"
			  :on-remove="handleRemove"
			  :on-success="updateSuccess"
			  :file-list="fileList"
			  list-type="picture">
			  <el-button size="small" type="primary">点击上传</el-button>
			  
	 		<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>

		</el-upload>
	</div>
</template>
<script>
	export default {
		name: "addMovie",
		data() {
			return {
				multiple:true,//是否支持多选文件
				upLoadData: {
					type:1,
					movieId:"",
					name:""
				},
				typeName:"主页图片"
			}
		},
		updated() {

		},
		created() {
			this.$store.state.img.fileList = [];
			this.getImgInfoByMovieIdAndType(this.$route.params.movieId,1);
			this.upLoadData.movieId = this.$route.params.movieId;
		},
		methods:{
			getImgInfoByMovieIdAndType(id,type) {
				//JSON.stringify(img)

				this.$store.dispatch("img/getImgInfoByMovieIdAndType", {
					id,
					type
				});
			},
			handleRemove(file, fileList) {
				this.$store.dispatch("img/handleRemove", {file,movieId:this.upLoadData.movieId});
			},
			handlePreview(file) {
				console.log(file);
			},
			updateSuccess(response, file, fileList) {
				this.$store.state.img.fileList = [];
				this.getImgInfoByMovieIdAndType(this.$route.params.movieId,this.upLoadData.type)
			},
			handleCommand(command) {
			   this.upLoadData.type = ~~command;
			   this.$store.state.img.fileList = [];
			   this.getImgInfoByMovieIdAndType(this.upLoadData.movieId,~~command);
		       if (command == "1"){
		       		this.typeName = "主页图片"
					this.$message('click on item ' + "主页图片");
				} else if(command == "2"){
					this.typeName = "封面图片"
					this.$message('click on item ' + "封面图片");
				}else if(command == "3"){
					this.typeName = "演职人员"
					this.$message('click on item ' +  "演职人员");
				}else if(command == "4"){
					this.typeName = "图集"
					this.$message('click on item ' + "图集");
				}else if(command == "5"){
					this.typeName = "资讯图片"
					this.$message('click on item ' + "资讯图片");
				}else if(command == "6"){
					this.typeName = "剧情图片"
					this.$message('click on item ' + "剧情图片");
				}
		    },
			beforeUpload(file) {
				this.upLoadData.name = file.name;

			},
			
		},
		computed:{
		    fileList() {
		      return this.$store.state.img.fileList
		    },
		},
	}
</script>

<style>
	/*.el-upload-list{
		display: flex!important
	}*/
	/*ul{
		width: 320px;
	}*/
<style>


