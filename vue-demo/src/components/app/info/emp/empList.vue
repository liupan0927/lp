

<template>
	<div>
			<h1>员工列表</h1>
 			<table>
				<thead>
 					<tr>
 						<th>员工编号</th>
 						<th>员工姓名</th>
						<th>员工岗位</th>
 						<th>员工薪水</th>
 						<th>操作</th>
 					</tr>
 				</thead>
				<tbody>
					
								{
							data.map((item, index) => {
								return (
									<tr key={Generator.randomNum}>
										<td>{item._id}</td>
										<td>{item.empName}</td>
										<td>{item.job}</td>
										<td>{item.sal}</td>
										<td><input type="button" value="删除" /></td>
									</tr>
								)
							})
						}
							
					
			
					</tbody>
				</table>	
	</div>
</template>
<script>
import axios from "axios"

	export default {
		name: "empList",
		 data() {
		 	return {
		 		curPage: 1,
		 		eachPage: 10,
		 		maxPage: 0,
		 		count: 0,
		 		data:[]
		 	}
		 },
		methods: {
				async getEmpsByPage(curPage = this.curPage, eachPage = this.eachPage) {
					const {data} = await axios.get(`/emps/getEmpsByPage`, {
						params: {
	     				curPage,
	     				eachPage
	    			}
					})
					console.log(data)
				}	
		},
		created() {
			this.getEmpsByPage()
		}

	}

</script>