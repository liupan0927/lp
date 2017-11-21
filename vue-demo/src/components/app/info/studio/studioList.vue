<template>
  <el-table
    :data="this.$store.state.studioStore.studioList"
    style="width: 100%">
    <el-table-column
      label="影院名称"
      width="180">

      <template slot-scope="scope">
        <i class="el-icon-more-outline"></i>
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="影院地址"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.address }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { mapState,mapGetters,mapMutations,mapActions } from 'Vuex'
  export default {
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
      handleEdit(index, row) {
        console.log(index, row);
        this.$router.push(`/info/addStudio?id=${row._id}`);
      },
      handleDelete(index, row) {
        console.log(row._id);
        this.$store.dispatch("asyncRemoveStudio",row._id)
        this.$store.dispatch("asyncGetStudiosByPage")
      }
    },
    created() {
      this.$store.dispatch("asyncGetStudiosByPage")
      console.log(this.$store.state.studioStore,"list this")
    },
    computed: {
      ...mapState(["studioList"])
    }
  }
</script>