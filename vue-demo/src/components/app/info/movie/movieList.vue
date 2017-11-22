<template>
	<div>
		<div style="display:flex;align-items: center;margin-bottom:25px">
			<span style="color:deeppink"> 电影名：</span>
			<el-input
				class="findWidth"
			    placeholder="请输入电影名"
			    prefix-icon="el-icon-search"
			    v-model="findData.inputName">
			</el-input>
			<span style="margin-left:20px;color:deeppink" >国家/地区：</span>
			<el-input
				class="findWidth"
			    placeholder="请输入国家/地区"
			    prefix-icon="el-icon-search"
			    v-model="findData.inputCountry">
			</el-input>
			<span style="margin-left:20px;color:deeppink" >电影状态：</span>
			<el-input
				style="width:280px"
				class="findWidth"
			    placeholder="0下映、1即将上映、2热映、3热播"
			    prefix-icon="el-icon-search"
			    v-model="findData.inputState">
			</el-input>
			<el-button type="primary" style="margin-left:35px" @click="aboutFind">查询</el-button>
		</div>
		
		<el-table
			@row-dblclick="doubleClick"
		    :data="data1.data"
		    border
		    style="width: 1041px;">
		    <el-table-column
		      fixed
		      prop="cName"
		      label="中文名"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      prop="release"
		      label="上映时间"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      prop="type"
		      label="影片类型"
		      width="120">
		    </el-table-column>
		    <el-table-column
		      prop="country"
		      label="国家/地区"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      prop="state"
		      label="电影状态"
		      :formatter="formatState"
		      width="120">
		    </el-table-column>

		    <el-table-column
		      fixed="right"
		      label="操作"
		      width="200">
		      <template slot-scope="scope">
		      	<el-button @click='change(scope.row)' type="text" size="small">修改</el-button>
		        <el-button @click="del(scope.row._id)" type="text" size="small">删除</el-button>
		        <el-button @click="upload(scope.row._id)" type="text" size="small">上传图片</el-button>
		       
		      </template>
		    </el-table-column>
		  </el-table>
		  <el-pagination

		      @size-change="eachNumbers"
		      @current-change="nowPage"
		      :current-page="~~data1.curPage"
		      :page-sizes="[6, 8, 10, 12]"
		      :page-size="~~data1.eachPage"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="data1.count">
		    </el-pagination>


			
		    <el-dialog :title="title" :visible.sync="dialogFormVisible" :dialogFormVisible="dialogFormVisible"  >
			  <el-form :model="form" :rules="rules" ref="form">
			    <el-form-item label="中文名" :label-width="formLabelWidth" prop="cName">
			      <el-input v-model="form.cName" class="width" auto-complete="off" :disabled="disabled"></el-input>
			    </el-form-item>
			    <el-form-item label="英文名" :label-width="formLabelWidth">
			      <el-input v-model="form.eName" class="width" auto-complete="off" :disabled="disabled"></el-input>
			    </el-form-item>
			    <el-form-item label="影片类型" :label-width="formLabelWidth">
			      <el-input v-model="form.type" class="width" auto-complete="off" :disabled="disabled"></el-input>
			    </el-form-item>
			    <el-form-item label="制片国家/地区" :label-width="formLabelWidth" prop="country">
			      <el-input v-model="form.country" class="width" auto-complete="off" :disabled="disabled"></el-input>
			    </el-form-item>
			    <el-form-item label="片长" :label-width="formLabelWidth">
			      <el-input v-model="form.duration" class="width" auto-complete="off" :disabled="disabled"></el-input>
			    </el-form-item>
			     <el-form-item label="上映时间" :label-width="formLabelWidth">
			      <el-input v-model="form.release" class="width" auto-complete="off" :disabled="disabled"></el-input>
			    </el-form-item>
			    <el-form-item label="评分" :label-width="formLabelWidth" prop="grade">
			      <el-input v-model="form.grade" class="width" auto-complete="off" :disabled="disabled"></el-input>
			    </el-form-item>
			     <el-form-item label="剧情简介" :label-width="formLabelWidth" >
			      <el-input v-model="form.synopsis" style="width:400px" auto-complete="off" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :disabled="disabled"></el-input>
			    </el-form-item>

			    <el-form-item label="电影状态" :label-width="formLabelWidth">
			      <el-select v-model="form.state" placeholder="请选择电影状态" :disabled="disabled">
			        <el-option label="下映" value="0"></el-option>
			        <el-option label="即将上映" value="1"></el-option>
			        <el-option label="热映" value="2"></el-option>
			        <el-option label="热播" value="3"></el-option>
			      </el-select>
			    </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="cancel">取 消</el-button>
			    <el-button type="primary" @click="submitForm('form')">确 定</el-button>
			  </div>
			</el-dialog>

	</div>
</template>
<script>
	// let pageNums = document.getElementById("pageNums");
	import axios from "axios";
	export default {
		name: "movieList",
		data() {
			var checkcName = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入电影中文名'));
				} else {
					callback();
				}
			};
			var checkCountry = (rule, value, callback) => {
				if (value === '') {
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
		        dialogFormVisible: false,
		        form: {
		         cName:""
		        },
		        formLabelWidth: '120px',
		        rules: {
					cName: [{
						validator: checkcName,
						trigger: 'blur'
					}],
					country:[{
						validator: checkCountry,
						trigger: 'blur'
					}],
					grade:[{
						validator: checkGrade,
						trigger: 'change'
					}],
				},
				title:"",
				disabled:false,
				findData:{

				}
		     
			}
		},
		created() {
			this.getInfoByPage();
			
		},
		computed:{
		    // 第一种
		    data1() {
		    	const data = this.$store.state.movie;
		      	return data
		    },

		    curPage: {
			    get () {
			    	
			      return this.$store.state.movie.curPage//this.$store.state.obj.curPage
			    },
			    set (value) {
			      // this.$store.commit('updateMessage', value)
			      this.nowPage(value);
			    }
			}
		},
		methods: {
			aboutFind() {
				const findData = {
					name:this.findData.inputName,
					state:this.findData.inputState,
					country:this.findData.inputCountry
				}
				this.findData = findData;
				this.getInfoByPage();
				// this.$store.dispatch("movie/asyncAboutFind", findData);
				// console.log(findData,"findData")
			},
			formatState(row, column) {
		    	
		    	var state = row[column.property]; 
		    	
		    	if(state == "2"){
		    		return "热映"
		    	}else if(state == "1"){
		    		return "即将上映"
		    	}else if(state == "0"){
		    		return "下映"
		    	}else if(state == "3"){
		    		return "热播电影"
		    	}
		    },
			doubleClick(row, event) {
				
				this.dialogFormVisible = true;
				this.form = row;
				this.title = "详细信息";
				this.disabled = true;
			},
			cancel() {
				this.getInfoByPage();
				this.dialogFormVisible = false;
			},
			submitForm(formName) {
				
				this.$refs[formName].validate((valid) => {
		          if (valid) {
		            //修改数据传入后台
		            this.$store.dispatch("movie/asyncSave",this.form);
		            this.dialogFormVisible = false;
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
			},
			change(row) {
				this.dialogFormVisible = true;
				
				this.form = row;
				this.title = "修改";
				this.disabled = false;
			},
			getInfoByPage(curPage = this.$store.state.movie.curPage,eachPage = this.$store.state.movie.eachPage, findData = this.findData) {//=号后面是默认值
				
				this.$store.dispatch("movie/asyncGetInfoByPage", {curPage : curPage, eachPage : eachPage, findData : findData});
			},
			eachNumbers(eachPage){
				
				this.getInfoByPage(1,eachPage);
			},
			// nowPage(){
			// 	console.log()
			// 	this.getInfoByPage(~~curPage.options[curPage.selectedIndex].text,~~pageNums.options[pageNums.selectedIndex].text);
			// },
			nowPage(curPage, eachPage){
				
				eachPage = this.$store.state.movie.eachPage || 10;
				this.getInfoByPage(~~curPage,eachPage);
			},
			del(_id) {
				
				this.$confirm('此操作将删除该电影排片信息、相关电影图片、相关资讯, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					
					this.$store.dispatch("movie/asyncDel", {
						id: _id
					});
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.getInfoByPage();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

				
			},
			upload(_id){
				this.$router.push(`/info/img/${_id}`)
			}
		}
	}
</script>
<style>

	.width{
		width: 300px
	}
	.findWidth{
		width: 200px
	}
</style>