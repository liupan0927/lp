<template>
	<div style="width:300px;
		margin:auto;
		margin-top:200px;
		height:191px;
		
		background-color: #e9e7ef;">
		<div class="head" 
			style="width:300px;
				height:40px;
				background-color: #e3f9fd;
				text-align: center;
				line-height: 40px;
				padding-bottom: 10px">
			<h3>登录页面</h3>
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
			<el-button @click="login" type="primary" plain
				style="width: 145px;float:left;">
				登录
			</el-button>
			<el-button @click="reg" type="primary" plain 
				style="width: 145px;float:right">
				注册
			</el-button>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
	export default {
		name: "login",
		data() {
			return {
				username: "ViVi",
				password:"123456",
			}
		},
		methods: {
			async login() {
				const username=this.username
				const password=this.password

				console.log("login-innnn",username,password)
				const data = await axios.post("/users/logi", {					
					username,
					password					
				})
				console.log("dataaaa",data)

				if(data.data.isLogin) {
					this.$router.push({
						name: "info"
					})				
				}else {
					this.$message({
				        showClose: true,
				        message: '输入错误!',
				        type: 'error'
			        });
					// alert("输入错误!");
				}
			},
			reg() {
				this.$router.push({
					name: "reg"
				})
			}
			
		}
	}
</script>