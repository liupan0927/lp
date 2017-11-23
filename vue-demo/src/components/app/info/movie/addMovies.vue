<template>
	<div>

		<el-form :model="form" :rules="rules" ref="form">
		    <el-form-item label="中文名" :label-width="formLabelWidth" prop="cName">
		      <el-input v-model="form.cName" class="width" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="英文名" :label-width="formLabelWidth">
		      <el-input v-model="form.eName" class="width" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="影片类型" :label-width="formLabelWidth">
		      <el-input v-model="form.type" class="width" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="制片国家/地区" :label-width="formLabelWidth" prop="country">
		      <el-input v-model="form.country" class="width" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="片长" :label-width="formLabelWidth">
		      <el-input v-model="form.duration" class="width" auto-complete="off"></el-input>
		    </el-form-item>
		     <el-form-item label="上映时间" :label-width="formLabelWidth">
		      <el-input v-model="form.release" class="width" auto-complete="off"></el-input>
		    </el-form-item>
		     <el-form-item label="剧情简介" :label-width="formLabelWidth" >
		      <el-input v-model="form.synopsis" style="width:400px" auto-complete="off" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
		    </el-form-item>
			 
		    <el-form-item label="电影状态" :label-width="formLabelWidth">
		    	<el-radio-group v-model="form.state">
				    <el-radio :label="0" selected>下映</el-radio>
				    <el-radio :label="1" >即将上映</el-radio>
				    <el-radio :label="2" >热映</el-radio>
				    <el-radio :label="3" >热播电影</el-radio>
			    </el-radio-group>
		    </el-form-item>
		    <el-form-item label="评分" :label-width="formLabelWidth" prop="grade">
		      <el-input v-model="form.grade" class="width" auto-complete="off" placeholder="即将上映电影不能评分，且评分不高于9.9"></el-input>
		    </el-form-item>
		    <el-form-item style="margin-left: 200px;">
			    <el-button type="primary" :disabled="disabled" @click="upload">上传图片</el-button>
			    <el-button @click="submitForm('form')" round>保存</el-button>
			</el-form-item>
		 </el-form>

		
	</div>
</template>
<script>
	import axios from "axios";
	export default {
		name: "addMovie",
		data() {
			var checkcName = (rule, value, callback) => {
				
				if (value == '' || value == undefined) {
					console.log("in")
					callback(new Error('请输入电影中文名'));
				} else {
					callback();
				}
			};
			var checkCountry = (rule, value, callback) => {
				if (value == '' || value == undefined) {
					callback(new Error('请输入制片国家或地区'));
				} else {
					callback();
				}
			};
			var checkGrade = (rule, value, callback) => {
				if (this.form.state == 1) {
					callback(new Error('不能为未上映电影评分'));
				} 
				if(value > 9.9) {
					callback(new Error('评分不能超过9.9'));
				}
				else {
					callback();
				}
			};
			return {
				form: {
		        	_id:"",
		        	state:2
		        },
		        formLabelWidth: '120px',
		        rules: {
					cName: [{
						required: true,
						validator: checkcName,
						trigger: 'blur'
					}],
					country:[{
						required: true,
						validator: checkCountry,
						trigger: 'blur'
					}],
					grade:[{
						validator: checkGrade,
						trigger: 'change'
					}],
				},
				disabled:true,
				
			}
		},
		created() {
			console.log(this.$store.state)
		},

		methods:{
			message(content, type) {
				this.$message({
		          	message: content,
		          	type: type
		        });
			},
			submitForm(formName) {
				
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		            this.$store.dispatch("movie/asyncSave",this.form);
					this.disabled = false;
					this.form = {state:2};
					this.message("保存成功！", "success");
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
			},
			
			
			upload(){
				this.$router.push(`/info/img/${this.$store.state.movie.data._id}`)
			}
		}
	}
</script>
<style>

	.width{
		width: 300px
	}
</style>

