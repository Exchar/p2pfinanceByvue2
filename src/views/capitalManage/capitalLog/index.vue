<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="3"
        ><el-input
          placeholder="搜索用户手机"
          prefix-icon="el-icon-search"
          v-model="input1"
        ></el-input>
        <div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :span="3"
        ><el-input
          placeholder="搜索姓名"
          prefix-icon="el-icon-search"
          v-model="input2"
        ></el-input>
        <div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :span="16"
        ><el-select v-model="value" placeholder="全部类型"
          ><el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option
        ></el-select>
        <div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :span="2"
        ><el-row class="but"><el-button plain>导出</el-button></el-row>
        <div class="grid-content bg-purple"></div
      ></el-col>
    </el-row>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
    >
      <el-table-column prop="number" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="number" label="用户手机" width="120">
      </el-table-column>
      <el-table-column prop="name" label="类型" width="120"> </el-table-column>
      <el-table-column prop="city" label="操作金额" width="120">
      </el-table-column>
      <el-table-column prop="address" label="操作前可用金额" width="130">
      </el-table-column>
      <el-table-column prop="czje" label="操作前冻结金额" width="130">
      </el-table-column>
      <el-table-column prop="dzje" label="操作后冻结金额" width="250">
      </el-table-column>
      <el-table-column prop="sxf" label="备注" width="200"> </el-table-column>
      <el-table-column prop="czfs" label="操作时间" width="120">
      </el-table-column>
    </el-table>
    <div class="blocks">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
        <!--//这是显示总共有多少数据，-->
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      input1: "",
      input2: "",
      value: "",
      currentPage: 1, //初始页
      pagesize: 2,
      options: [
        {
          value: "选项1",
          label: "投资用户"
        },
        {
          value: "选项4",
          label: "借款用户"
        }
      ]
    };
  }
};
</script>
<style scoped>
.el-col {
  padding: 5px 5px 5px 5px;
}
</style>
