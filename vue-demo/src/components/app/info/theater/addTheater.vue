<template>
	<div> 
		<el-form ref="form" label-width="80px" size="mini">
			<el-form-item label="影厅名称">
			  	<el-col :span="18">
			    	<el-input v-model="sizeForm.theaterName"></el-input>
			    </el-col>
			</el-form-item>
		  
			<el-form-item label="行数">
			  	<el-col :span="18">
			    	<el-input v-model="sizeForm.row"></el-input>
			    </el-col>
			</el-form-item>
		    <el-form-item label="列数">
			  	<el-col :span="18">
			    	<el-input v-model="sizeForm.col"></el-input>
			    </el-col>
		    </el-form-item>

		    <el-form-item size="large">
			    <el-button type="primary" @click="onSave" id="change">保存</el-button>
			    <el-button>重置</el-button>
			</el-form-item>
		</el-form>

		<el-table
		    :data="this.theaterList.rows"
		    style="width: 100%">
		    <el-table-column
		      label="影厅名称"
		      width="180">
		      <template slot-scope="scope">
		        <i class="el-icon-more-outline"></i>
		        <span style="margin-left: 10px">{{ scope.row.name }}</span>
		      </template>
		    </el-table-column>

		    <el-table-column
		      label="影院名称"
		      width="180">
		      <template slot-scope="scope">
		          <div slot="reference" class="name-wrapper">
		            <el-tag size="medium">{{sizeForm.name}}</el-tag>
		          </div>
		      </template>
		    </el-table-column>

		    <el-table-column label="操作">
		      <template slot-scope="scope">
		        <el-button
		          size="mini"
		          @click="handleSeat(scope.$index, scope.row)">查看座位</el-button>
		        <el-button
		          size="mini"
		          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
		        <el-button
		          size="mini"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>   
		      </template>
		    </el-table-column>   
	  	</el-table>
	  	<div class="block">
	      <el-pagination
	        :page-size="10"
	        @size-change="handleSizeChange"
	        @current-change="handleCurrentChange"
	        layout="total, prev, pager, next, jumper"
	        :total="this.theaterList.total">
	      </el-pagination>
	    </div>
  		

	</div>
</template>

<script>
    import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
	export default {
		name: "addTheater",
		data() {

		  return {
		    sizeForm: {
		      theaterName: "巨幕厅",
		      row: "9",
		      col: "9",
		      data:[]
		    },
		  };
		},
		methods: {
			// 分页 每页显示条数
			handleSizeChange(val) {

			},
			// 分页 当前页
			handleCurrentChange(val) {
				this.$store.dispatch("theaterStore/asyncGetTheaterByPage",{page:val,id:this.sizeForm.id})
			},
			handleDelete(index,row) {
				console.log(row,"删除")
				this.$store.dispatch("theaterStore/asyncRemoveTheater",{id:row._id})
				this.$store.dispatch("theaterStore/asyncGetTheaterByPage",{id:this.sizeForm.id})
			},
			handleSeat(index,row) {
				console.log("查看座位")
			},
			handleEdit(index,row) {
				console.log("修改")
			},
		  	onSave() {
		    	const theater = {
		    		name:this.sizeForm.theaterName,
		    		rowNo:this.sizeForm.row,
		    		colNo:this.sizeForm.col,
		    		studioId:this.sizeForm.id
		    	}
		    	console.log(this.theaterList)
		    	// this.$store.dispatch("theaterStore/asyncAddTheater",theater)
		    	// this.$store.dispatch("theaterStore/asyncGetTheaterByPage",{id:theater.studioId})
		  	}
		},
		created() {
			if(this.$route.query){
				const {id,name} = this.$route.query
				this.sizeForm.id = id	
				this.sizeForm.name = name				
			}
			this.$store.dispatch("theaterStore/asyncGetTheaterByPage",{id:this.sizeForm.id})

		},
		computed:mapState('theaterStore',['theaterList'])
	};
</script>
// :data="data"
<style></style>