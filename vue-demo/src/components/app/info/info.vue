<template>
	<el-container>
		<el-header>
			<img src="../img/LOGO.png" height="49" width="47" style="padding-top: 5px;">
			<span>欢迎您，系统管理员</span>
			<span style="float:right;color:cornflowerblue;font-size:14px" @click="returnLogin">退出登录</span>
		</el-header>
		  	<el-container>
			    <el-aside>
					<el-menu
				      	:default-openeds="arr"
				      	style=""
					  	router
				      	default-active="2"
				      	class="el-menu-vertical-demo"
				      	@open="handleOpen"
				      	@close="handleClose"
				      	background-color="#545c64"
				      	text-color="#fff"
				      	active-text-color="pink">

				      	<el-submenu index="1">
				        	<template slot="title">
					          	<i class="el-icon-view"></i>
					          	<span>电影管理</span>
					        </template>
					        <el-menu-item-group>
					          	<el-menu-item index="/info/addMovies">新增电影</el-menu-item>
					          	<el-menu-item index="/info/moviesList">电影列表</el-menu-item>
					        </el-menu-item-group>
				      	</el-submenu>

					 	<el-submenu index="2">
				        	<template slot="title">
				          		<i class="el-icon-setting"></i>
				          		<span>影院管理</span>
				        	</template>
					        <el-menu-item-group>

					          	<el-menu-item index="/info/addStudio">新增影院</el-menu-item>
					          	<el-menu-item index="/info/studioList">影院列表</el-menu-item>

					        </el-menu-item-group>
				      	</el-submenu>

				        <el-submenu index="3">
					        <template slot="title">
					           	<i class="el-icon-menu"></i>
					          	<span>排片管理</span>
					        </template>
					        <el-menu-item-group>
					          	<el-menu-item index="/info/addSchedule">新增排片</el-menu-item>
					        </el-menu-item-group>
				        </el-submenu>
						
				      	<el-submenu index="4">
					        <template slot="title">
					          	<i class="el-icon-mobile-phone"></i>
					          	<span>资讯管理</span>
					        </template>
					        <el-menu-item-group>
					        	<el-menu-item index="/info/addMovieNews">新增资讯</el-menu-item>
					          	<el-menu-item index="/info/movieNewsList">资讯列表</el-menu-item>
					        </el-menu-item-group>
				      </el-submenu>

				    </el-menu>
			    </el-aside>
			    <el-container>
				    <el-main>
				    	<div ref="welcome" style="margin:auto;width:300px;margin-top:220px">
				    		<div style="width: 300px;text-align:center"><i class="el-icon-news" style="font-size:46px;font-weight:700;color:darksalmon;"></i>
				    		</div>
			    			<div style="width: 320px;text-align:center;margin-top:20px">
				    			<span style="font-size:40px;font-weight:700;color:darksalmon;">
				    			欢迎来到猫眼电影后台管理系统！
				    			</span>
				    		</div>
				    	</div>
				    	<div ref="list" style="display:none;">
				    		<router-view></router-view>
				    	</div>
						
				    </el-main>
				    <el-footer>
				    	建议使用360浏览器、谷歌浏览器
				    </el-footer>
		    	</el-container>
			</el-container>
	</el-container>

</template>



<script>
	export default {
		name: "info",
		data() {
			return {
				arr:["1","2","3","4"],
				
			}
		},
		created() {
			
			this.handleOpen();
		},
		updated() {
			console.log(this.$refs.welcome)
			this.$refs.welcome.style.display = "none";
			this.$refs.list.style.display = "block";
		},
		methods: {//ctrl+alt+f
			handleOpen(key, keyPath) {
				console.log(this.$refs.div)
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			returnLogin() {
				// this.$router.push("/login");
				const h = this.$createElement;
				this.$msgbox({
					title: '提示消息',
					message: h('p', null, [
						h('span', null, '您将退出登录？ '),
						h('i', {
							style: 'color: teal'
						}, '确定将退出！')
					]),
					showCancelButton: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					beforeClose: (action, instance, done) => {
						if (action === 'confirm') {
							instance.confirmButtonLoading = true;
							instance.confirmButtonText = '执行中...';
							setTimeout(() => {
								done();
								setTimeout(() => {
									instance.confirmButtonLoading = false;
									this.$router.push("/");
								}, 300);
							}, 3000);
						} else {
							done();
						}
					}
				})
			}
		}
	}
</script>
<style>
	.el-header{
	    background-color: #B3C0D1;
	    color: darkorchid;
	    text-align: left;
	    line-height: 60px;

	}
	.el-footer {
	    background-color: #B3C0D1;
	    color: #333;
	    font-size: 12px;
	    text-align: center;
	    line-height: 60px;
	}
	  

	.el-aside>ul {
	    height: 100%;
	}

	  
	.el-main {
	    /*background-color: #E9EEF3;
	    color: #333;
	    text-align: center;
	    line-height: 160px;*/
	}
	  
	body > .el-container {
	    margin-bottom: 40px;
	}
	  
	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
	    line-height: 260px;
	}
	  
	.el-container:nth-child(7) .el-aside {
	    line-height: 320px;
	}
</style>