<template>
  <div>
    <!--搜索问题关键字-->
    <div class="demo-input-suffix">
      <el-input
        placeholder="问题关键字"
        prefix-icon="el-icon-search"
        v-model="input"
        @keyup.native="getfeedBackKeywords"
      >
      </el-input>
    </div>
    <!--状态搜索-->
    <el-select
      class="selected"
      v-model="stateValue"
      placeholder="请选择"
      @change="getfeedBackKeywords"
    >
      <el-option label="全部" value=""></el-option>
      <el-option label="已处理" value="0"></el-option>
      <el-option label="待处理" value="1"></el-option>
    </el-select>
    <!--表格-->
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column
        prop="idea"
        label="意见建议"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="反馈者手机"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="手机型号"
      ></el-table-column>
      <el-table-column prop="source" label="来源"></el-table-column>
      <el-table-column prop="time" label="提交时间">
        <template slot-scope="scope">
          {{ formatDate(scope.row.time) }}
        </template>
      </el-table-column>
      <el-table-column prop="reply" label="回复"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handle(scope.$index, scope.row)"
            >处理</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--编辑对话框-->
    <el-dialog title="处理" :visible.sync="dialogFormEditVisible">
      <el-form :model="editform" ref="editform">
        <el-form-item label="意见建议">
          <el-input v-model="editform.idea" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="phone" label="反馈者手机">
          <el-input v-model="editform.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机型号">
          <el-input v-model="editform.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="source" label="来源">
          <el-input v-model="editform.source" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="提交时间">
          <el-input v-model="time" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="reply" label="回复">
          <el-input v-model="editform.reply" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="selStatus">
          <br />
          <el-select
            v-model="editform.state"
            autocomplete="off"
            style="width: 100%"
          >
            <el-option label="已处理" value="0"></el-option>
            <el-option label="待处理" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="dialogFormEditVisible = false"
          >取 消</el-button
        >
        <el-button class="save" type="primary" @click="saveDept"
          >保 存</el-button
        >
      </div>
    </el-dialog>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[1, 2, 3, 4, 5, 6]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
      prev-text="上一页"
      next-text="下一页"
    >
    </el-pagination>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "feedBack",
  data: function() {
    return {
      input: "",
      stateValue: "",
      time: "",
      currentPage4: 1,
      pageSize: 6,
      count: 6,
      tableData: [],
      dialogFormEditVisible: false,
      editform: {}
    };
  },
  created() {
    this.getfeedBackKeywords();
  },
  methods: {
    formatDate: function(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getfeedBackKeywords();
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.getfeedBackKeywords();
    },
    getfeedBackList: function() {
      //向后端服务器去请求数据
      this.$axios
        .post("/markApi/finance/idea/findByPage", {
          page: this.page,
          limit: this.limit,
          count: this.count
        })
        .then(response => {
          console.log(response);
          var result = response.data;
          if (result.code === "200") {
            this.tableData = response.data.data;
            console.log(this.tableData);
          } else {
            this.$alert(result.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handle(index, obj) {
      this.dialogFormEditVisible = true;
      this.editform = { ...obj };
      let priTime = obj.time;
      this.time = moment(priTime).format("YYYY-MM-DD");
    },
    saveDept: function() {
      // 将修改的数据发给服务器，接收服务器的响应并进行处理
      this.$axios
        .post("/markApi/finance/idea/update", {
          id: this.editform.id,
          idea: this.editform.idea,
          phone: this.editform.phone,
          type: this.editform.type,
          source: this.editform.source,
          time: Date.parse(new Date(this.time)),
          reply: this.editform.reply,
          state: this.editform.state
        })
        .then(response => {
          var result = response.data;
          if (result.code === "200") {
            this.$message.success("处理成功");
            this.getfeedBackKeywords();
            this.dialogFormEditVisible = false;
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("请求出错");
        });
    },
    getfeedBackKeywords: function() {
      this.$axios
        .post("/markApi/finance/idea/findByPage", {
          limit: this.currentPage4,
          page: this.pageSize,
          count: this.count,
          idea: "" + this.input,
          state: "" + this.stateValue
        })
        .then(response => {
          var result = response.data;
          console.log(response);
          if (result.code === "200") {
            this.tableData = result.data;
            this.count = response.data.count;
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.demo-input-suffix {
  width: 200px;
  position: absolute;
  left: 20px;
  top: 20px;
}
.selected {
  position: absolute;
  top: 20px;
  left: 240px;
  width: 150px;
}
.el-table {
  width: 100%;
}
.el-dialog {
  position: relative;
}
.el-form-item {
  width: 45%;
}
.phone {
  position: absolute;
  top: 82px;
  right: 30px;
}
.source {
  position: absolute;
  top: 185px;
  right: 30px;
}
.reply {
  position: absolute;
  top: 287px;
  right: 30px;
}
.dialog-footer {
  position: absolute;
  bottom: 120px;
  left: 530px;
}
.cancel {
  position: absolute;
  left: 0;
  width: 100px;
}
.save {
  position: absolute;
  left: 100px;
  width: 100px;
}
</style>
