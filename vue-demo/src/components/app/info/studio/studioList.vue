<template>
    <div>  
      <el-table
      :data="this.$store.state.studioStore.studioList.rows"
      style="width: 1241px">
      <el-table-column
        label="影院名称"
        width="280">
        <template slot-scope="scope">
          <i class="el-icon-more-outline"></i>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="影院地址"
        width="320">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>名称: {{ scope.row.name }}</p>
            <p>地址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" width="200">{{ scope.row.address }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">重新编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
          size="mini"
          @click="handleAdd(scope.$index, scope.row)">新增影厅</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :total="this.$store.state.studioStore.studioList.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
  export default {
    name: "studioList",
    data() {
      return {

        tableData: [{
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      // 分页 每页显示条数
      handleSizeChange(val) {
        this.$store.dispatch(`studioStore/asyncGetStudiosByPage`,val)
      },
      // 分页 当前页
      handleCurrentChange(val) {
        console.log(this.$store.state.studioStore.studioList.total)
        this.$store.dispatch(`studioStore/asyncGetStudiosByPage`,val)
      },
      //修改
      handleEdit(index, row) {
        this.$router.push(`/info/addStudio?id=${row._id}&name=${row.name}&address=${row.address}`);
      },
      // 删除
      handleDelete(index, row) {
        this.$store.dispatch("studioStore/asyncRemoveStudio",row._id)
        this.$store.dispatch("studioStore/asyncGetStudiosByPage")
      },
      // 新增
      handleAdd(index, row) {
        console.log("in")
        this.$router.push(`/info/addTheater?id=${row._id}&name=${row.name}`)
      }
    },
    created() {
      this.$store.dispatch(`studioStore/asyncGetStudiosByPage`)
    },
    computed: {
      ...mapState(["studioList"])
    }
  }
</script>