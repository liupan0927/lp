<template>
  <el-table
    :data="this.$store.state.studioStore.studioList"
    style="width: 100%">
    <el-table-column
      label="影厅名称"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-more-outline"></i>
        <span style="margin-left: 10px">{{ scope.row.theaterName }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="影院名称"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">

          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 10px" v-model="theaterName"></span>
            <el-tag size="medium" v-model="theaterName"></el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <div class="block">
      <el-pagination
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="111">
      </el-pagination>
    </div>
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
</template>

<script>
  export default {
    name: "theaterList",
    data() {
      return {
        
        tableData: [{
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },{
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push(`/info/addTheater?id=${row._id}`);
      },
      handleDelete(index, row) {
       
      },
      handleSeat() {
        // this.$router.push(`/info/addTheater`)
      }
    },
    created() {
      
    },
    computed: {
     
    }
  }
</script>