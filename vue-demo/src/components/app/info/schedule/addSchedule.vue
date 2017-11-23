<template>
	<table cellpadding="5">
		<tr>
			<td>电影:</td>
			<td>
				<el-select v-model="value" placeholder="请选择"
				@change="getStudiosByMovieId(value)">
				    <el-option
				      v-for="item in movies"
				      :key="item._id"
				      :label="item.cName"
				      :value="item._id">
				    </el-option>
				</el-select>
			</td>
			<td>影院:</td>
			<td>
				<el-select v-model="value1" placeholder="请选择"
				@change="getTheaters(value1)">
				    <el-option
				        v-for="item in studios"
				        :key="item._id"
				        :label="item.name"
				        :value="item._id">
				    </el-option>
				 </el-select>
			</td>
			<td>放映厅：</td>
			<td>
				<el-select v-model="value2" placeholder="请选择" >
				    <el-option
				        v-for="item in theaters"
				        :key="item._id"
				        :label="item.name"
				        :value="item._id">
				    </el-option>
				 </el-select>
			</td>
		</tr>
		<tr>
			<td>放映时间:</td>
			<td>
				<div class="block" >
				    <el-date-picker
				      v-model="value3"
				      type="datetime"
				      placeholder="选择日期时间">
				    </el-date-picker>
				</div>
			</td>
			<td>票价:</td>
			<td>
				<el-input v-model="input" placeholder="请输入内容"></el-input>
			</td>
		</tr>
		<tr>
			<td></td>
			<td><el-button type="success" @click="addSchedule({
				value,
				value1,
				value2,
				value3,
				input
			})">保存</el-button></td>
		</tr>
		<tr>
			<td colspan="6">
				<el-table
				    :data="studioList"
				    style="width: 100%">
				    <el-table-column
				      label="影院名称"
				      width="180">
				      <template slot-scope="scope">
				        <span style="margin-left: 10px">{{ scope.row.name }}</span>
				      </template>
				    </el-table-column>
				    <el-table-column
				      label="影院地址"
				      width="180">
				      <template slot-scope="scope">
				        <span style="margin-left: 10px">{{ scope.row.address }}</span>
				      </template>
				    </el-table-column>
				    <el-table-column label="操作">
				      <template slot-scope="scope">
				        <el-button
				          size="mini"
				          @click="getTheaterByStudioIds(scope.row)">查看放映厅</el-button>
				        <el-button
				          size="mini"
				          type="danger"
				          @click="delStudioLists(scope.row)">删除</el-button>
				      </template>
				    </el-table-column>
			  	</el-table>
			</td>
		</tr>
		<tr>
			<td colspan="6">
				<el-table
				    :data="theaterList"
				    style="width: 100%">
				    <el-table-column
				      label="影厅名称"
				      width="180">
				      <template slot-scope="scope">
				        <span style="margin-left: 10px">{{ scope.row.theaterId.name }}</span>
				      </template>
				    </el-table-column>
				    <el-table-column
				      label="放映时间"
				      width="180">
				      <template slot-scope="scope">
				        <span style="margin-left: 10px">{{ scope.row.show_time }}</span>
				      </template>
				    </el-table-column>
				    <el-table-column label="操作">
				      <template slot-scope="scope">
				        <el-button
				          size="mini"
				          @click="getSeatingsByScheduleId(scope.row)">查看座位</el-button>
				        <el-button
				          size="mini"
				          type="danger"
				          @click="delTheaterList(scope.row)">删除</el-button>
				      </template>
				    </el-table-column>
			  	</el-table>
			</td>
		</tr>
		<tr>
			<td colspan="6">
				<el-table
				    :data="seatingList"
				    style="width: 100%">
				    <el-table-column
				      label="座位"
				      width="180">
				      <template slot-scope="scope">
				        <span style="margin-left: 10px">{{ scope.row.seatId.displayName }}</span>
				      </template>
				    </el-table-column>
				    <el-table-column
				      label="是否售出"
				      width="180">
				      <template slot-scope="scope">
				        <span style="margin-left: 10px">{{ scope.row.state }}</span>
				      </template>
				    </el-table-column>
				    <el-table-column label="操作">
				      <template slot-scope="scope">
				        <el-button
				          size="mini"
				          @click="buy(scope.row)">购票</el-button>
				      </template>
				    </el-table-column>
			  	</el-table>
			</td>
		</tr>
	</table>
	

</template>

<script>
	import { mapActions, mapState, mapMutations, mapGetters } from "vuex"
	export default {
		name: "addSchedule",
		data() {
			return {
				 value:"",
				 value1:"",
				 value2:"",
				 value3:new Date(),
				 input:"",
				 currentPage4: 1
			}
		},
		computed: {
			...mapState("addScheduleStore",["movies","studios","theaters","studioList","theaterList","seatingList"])
		},
		methods: {
			...mapActions("addScheduleStore",["getMovies","getStudios","addSchedule","getStudiosByMovieId","getTheaterByStudioId","getSeatingsByScheduleId","buy","delStudioList","delTheaterList"]),
			...mapMutations("addScheduleStore",["getTheaters"]),
		    getTheaterByStudioIds({_id}) {
		    	this.getTheaterByStudioId({
		    		value:this.value,
		    		value1:_id,
		    		value3:this.value3
		    	})
		    },
		    delStudioLists({_id}) {
		    	this.delStudioList({
		    		value:this.value,
		    		value1:_id
		    	})
		    	this.getStudios();
		    }


			 
		},
		created() {
			this.getMovies()
			this.getStudios()
		}

	}
</script>