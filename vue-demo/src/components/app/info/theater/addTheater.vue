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
			    <el-button @click="reset">重置</el-button>
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
		        
		        <el-button size="mini" @click="change(scope.$index, scope.row)" style="margin-right:10px">修改</el-button>
		        <el-dialog title="修改影厅" :visible.sync="dialogFormVisible">
				<el-form>
				<el-form-item label="影厅名称" :label-width="formLabelWidth">
				  <el-input v-model="sizeForm.changeTheaterName" auto-complete="off"></el-input>
				</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleEdit(scope.$index, scope.row)">确 定</el-button>
				</div>
				</el-dialog>
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
			<el-dialog title="座位列表" :visible.sync="dialogTable" :dialogTable="dialogTable">
				<el-table :data="this.seatList">
				    <el-table-column property="rowNo" label="行号" ></el-table-column>
				    <el-table-column property="colNo" label="列号" ></el-table-column>
				    <el-table-column property="displayName" label="座位名称" ></el-table-column>
					<el-table-column property="displayName" label="售票状态" ></el-table-column>
				</el-table>
			</el-dialog>
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
		      changeTheaterName: "巨幕厅",
		      row: "9",
		      col: "9",
		      data:[]
		    },
		    update:{
		    	name: null,
		    	id: null
		    },
		    gridData: [{
	          	date: '2016-05-02',
	            name: '王小虎',
	            address: '上海市普陀区金沙江路 1518 弄'
	        }],
	        theaterId: null,
		    theater: {},
		    dialogTable: false,
		    dialogTableVisible: false,
        	dialogFormVisible: false,
	        formLabelWidth: '120px'
		  };
		},
		methods: {
			open() {
				this.$alert('请正确输入', '提示信息', {
					confirmButtonText: '确定',
				});
			},
			// 重置
			reset() {
				this.sizeForm.theaterName=""
				this.sizeForm.row=""
				this.sizeForm.col=""
			},
			// 分页 每页显示条数
			handleSizeChange(val) {
			},
			// 分页 当前页
			handleCurrentChange(val) {
				this.$store.dispatch("theaterStore/asyncGetTheaterByPage",{page:val,id:this.sizeForm.id})
			},
			// 影厅删除
			handleDelete(index,row) {
				console.log(row,"删除")
				this.$store.dispatch("theaterStore/asyncRemoveTheater",{id:row._id})
				this.$store.dispatch("theaterStore/asyncGetTheaterByPage",{id:this.sizeForm.id})
			},
			// 查看座位
		  	handleSeat(index,row) {
		  		this.dialogTable = true
		  		const seat = {
		  			rowNo: this.row,
		    		colNo: this.col,
		    		displayName: `${this.row} +"排"+ ${this.col}+"列"`,
		    		theaterId: row._id

		  		}
		  		this.theaterId=row._id
		  		this.$store.dispatch("theaterStore/getSeatsAsync",row._id)
		  	},
			// 进入修改
			change(index,row){
				console.log(row)
				this.dialogFormVisible = true
				this.update.id=row._id
			},
			// 修改操作执行
			handleEdit(index,row) {
				this.update.name = this.sizeForm.changeTheaterName
				this.dialogFormVisible = false
				const name=this.update.name
				const id=this.update.id
				this.$store.dispatch("theaterStore/asyncUpdateTheater",{id:id,name:name})
				this.$store.dispatch("theaterStore/asyncGetTheaterByPage",{id:this.sizeForm.id})
			},
			// 新增影厅
		  	onSave() {
		    	const theater = {
		    		name:this.sizeForm.theaterName,
		    		rowNo:this.sizeForm.row,
		    		colNo:this.sizeForm.col,
		    		studioId:this.sizeForm.id
		    	}
		    	this.theater=theater
		    	console.log(theater.colNo,theater.rowNo,theater.name)
				if (theater.colNo != "" && theater.rowNo != "" && theater.name != "") {
					this.$store.dispatch("theaterStore/asyncAddTheater",theater)
		    		this.$store.dispatch("theaterStore/asyncGetTheaterByPage",{id:theater.studioId})
				}
				else{
					this.open()
				}
		    	
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
		computed:mapState('theaterStore',['theaterList','seatList'])
	};
</script>
<style></style>