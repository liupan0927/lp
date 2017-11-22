<template>
	<el-form ref="form" label-width="80px" size="mini">
	  <el-form-item label="影院名称">
	  	<el-col :span="8">
	    	<el-input v-model="sizeForm.name"></el-input>
	    </el-col>
	  </el-form-item>
	  <el-form-item label="影院地址">
	  	<el-col :span="8">
	    	<el-input v-model="sizeForm.address"></el-input>
	    </el-col>
	  </el-form-item>
	  <el-form-item size="large">
	    <el-button type="primary" @click="onSubmit" ref="change">立即创建</el-button>
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
		    	const info = {name:this.sizeForm.name,address:this.sizeForm.address,updateId:this.sizeForm.id}
		    	this.$store.dispatch("studioStore/asyncAdd",info)
		  	}

		},
		created() {
			const params=this.$route.query
			const change = document.getElementById("change")
			if(this.$route.query.id){
				this.sizeForm.name= params.name
				this.sizeForm.address= params.address
				this.sizeForm.id= params.id
				console.log(change,"修改")
			console.log(this.$refs.change)
				
			}
			else{

			}
			
		},
		updated() {
			console.log(this.$refs.change)
		}
	};
</script>

<style></style>