<template>
	<el-form ref="form" label-width="80px" size="mini">
	  <el-form-item label="影院名称">
	  	<el-col :span="18">
	    	<el-input v-model="sizeForm.name"></el-input>
	    </el-col>
	  </el-form-item>
	  <el-form-item label="影院地址">
	  	<el-col :span="18">
	    	<el-input v-model="sizeForm.address"></el-input>
	    </el-col>
	  </el-form-item>
	  <el-form-item size="large">
	    <el-button type="primary" @click="onSubmit" id="change">立即创建</el-button>
	    <el-button>取消</el-button>
	  </el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: "addStudio",
		data() {
		  return {
		    sizeForm: {
		      name: "星美学府影城",
		      address: "成都武侯区共和村"
		    }
		  };
		},
		methods: {
		  	onSubmit() {
		    	const info = {name:this.sizeForm.name,address:this.sizeForm.address}
		    	this.$store.dispatch("asyncAdd",info)
		  	}
		},
		created() {
			console.log(this.$route.query)
			if(this.$route.query){

			}
		}
	};
</script>

<style></style>