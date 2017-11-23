<template>
	<div style="width:300px;
		margin-top:200px;
		height:191px;
		margin:auto;
		background-color: #e9e7ef;">
		<div class="head" 
			style="width:300px;
				height:40px;
				background-color: #e3f9fd;
				text-align: center;
				line-height: 40px;
				padding-bottom: 10px">
			<h3>注册页面</h3>
		</div>
			
		<div style="width: 300px;margin-bottom: 10px">
			<el-input placeholder="请输入账号" 
				ref="username" v-model="username">
			</el-input>
		</div>
		<div style="width: 300px;margin-bottom: 10px">
			<el-input type="password" placeholder="请输入密码" 
				ref="password" v-model="password">
			</el-input>
		</div>

		<div>
			<el-button @click="reg" type="primary" plain 
				style="width: 300px;">
				注册
			</el-button>
		</div>
	</div>
</template>
<script>
	import axios from "axios"
	export default {
		name: "reg",
		data() {
			return {
				username: "ViVi",
				password:"123456",
				// data: []
			}
		},
		created(){
			console.log(this)  
			// this.reg()
		},
		methods: {
			async reg() {
				const username=this.username
				const password=this.password

				console.log("reg-innnn",username,password)
				const data = await axios.post("/users/reg", {
					
						username,
						password
					
				})
				console.log("dataaaa",data)

				if(data.data.isHave) {
					this.$message({
				        showClose: true,
				        message: '该用户名已存在!',
				        type: 'error'
			        });
					// alert("该用户名已存在!");
				}else {
					this.$router.push({
						name: "login",
						// params: {
						// 	username: this.username,
						// 	password: this.password
						// }
					})
				}
			}
		}
	}
</script>