<template>
  <el-row>
    <el-button @click="dialogFormVisible = true">+添加分类</el-button>

    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分类名称" >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" >
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="启用" value="shanghai"></el-option>
            <el-option label="禁用" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false"
          >保存</el-button
        >
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="分类名称" width="180">
      </el-table-column>
      <el-table-column prop="name" label="排序" width="180"> </el-table-column>
      <el-table-column prop="address" label="状态"> </el-table-column>
      <el-table-column prop="address" label="操作"> </el-table-column>
    </el-table>
  </el-row>
</template>
<script>
export default {
  name: "debitCategory",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>
<style scoped>
.el-dialog__footer {
  text-align: center;
}
</style>
