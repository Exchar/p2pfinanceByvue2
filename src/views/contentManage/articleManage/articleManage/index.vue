<template>
  <div>
    <div>
      <el-button type="primary" @click="jump">+ 添加新闻</el-button>
    </div>
    <div class="demo-input-suffix">
      <el-input
        placeholder="搜索文章标题"
        prefix-icon="el-icon-search"
        v-model="input"
        @keyup.native="getArticleTitleList"
      >
      </el-input>
    </div>
    <el-select
      class="selected1"
      v-model="typeValue"
      placeholder="请选择"
      @change="getArticleTitleList"
    >
      <el-option label="全部分类" value=""></el-option>
      <el-option label="新闻公告" value="3"></el-option>
      <el-option label="行业动态" value="4"></el-option>
      <el-option label="帮助中心" value="5"></el-option>
      <el-option label="活动中心" value="6"></el-option>
      <el-option label="关于我们" value="7"></el-option>
    </el-select>
    <el-select
      class="selected2"
      v-model="stateValue"
      placeholder="请选择"
      @change="getArticleTitleList"
    >
      <el-option label="全部状态" value=""></el-option>
      <el-option label="上架" value="0"></el-option>
      <el-option label="下架" value="1"></el-option>
    </el-select>
    <!--表格-->
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="type" label="分类">
        <template slot-scope="scope">
          <span>{{ transType(scope.row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="发布时间" >
        <template slot-scope="scope">
          {{ formatDate(scope.row.time) }}
        </template>
      </el-table-column>
      <el-table-column prop="number" label="排序" ></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--编辑对话框-->
    <el-dialog title="编辑" :visible.sync="dialogFormEditVisible">
      <el-form :model="editform" ref="editform">
        <el-form-item label="标题">
          <el-input v-model="editform.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="type" label="分类">
          <el-input v-model="editform.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-input v-model="time" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="number" label="排序">
          <el-input v-model="editform.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="selStatus">
          <br />
          <el-select
            v-model="editform.state"
            autocomplete="off"
            style="width: 100%"
          >
            <el-option label="上架" value="0"></el-option>
            <el-option label="下架" value="1"></el-option>
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
      background
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
  name: "articleManage",
  data: function() {
    return {
      input: "",
      typeValue: "",
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
    this.getArticleTitleList();
  },
  methods: {
    formatDate: function(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    transType(type) {
      let typeText = "";
      switch (type) {
        case "2":
          typeText = "请选择：";
          break;
        case "3":
          typeText = "新闻公告";
          break;
        case "4":
          typeText = "行业动态";
          break;
        case "5":
          typeText = "帮助中心";
          break;
        case "6":
          typeText = "活动中心";
          break;
        case "7":
          typeText = "关于我们";
          break;
      }
      return typeText;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getArticleTitleList();
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.getArticleTitleList();
    },
    getArticleList: function() {
      //向后端服务器去请求数据
      this.$axios
        .post("/markApi/finance/essay/findByPage", {
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
    jump() {
      this.$router.push("/articleManage/articleManage/addArticle");
    },
    handleEdit(index, obj) {
      this.dialogFormEditVisible = true;
      this.editform = { ...obj };
      let priTime = obj.time;
      this.time = moment(priTime).format("YYYY-MM-DD");
    },
    saveDept: function() {
      // 将修改的数据发给服务器，接收服务器的响应并进行处理
      this.$axios
        .post("/markApi/finance/essay/update", {
          id: this.editform.id,
          title: this.editform.title,
          type: this.editform.title,
          time: Date.parse(new Date(this.time)),
          number: this.editform.number,
          state: this.editform.state
        })
        .then(response => {
          var result = response.data;
          if (result.code === "200") {
            this.$message.success("编辑成功");
            this.getArticleTitleList();
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
    handleDelete(val) {
      // 发起一个请求到服务器，让服务器删除这一条数据
      this.$axios
        .post("/markApi/finance/essay/delete", {
          id: val.id
        })
        .then(response => {
          var result = response.data;
          console.log(response);
          if (result.code === "200") {
            if (result.msg === "删除成功") {
              this.getArticleTitleList();
            } else {
              this.$message.error(result.msg);
            }
          } else {
            this.$message.error(result.msg);
          }
        })
        .catch(() => {
          this.$message.error("请求出错,请检查");
        });
    },
    getArticleTitleList: function() {
      this.$axios
        .post("/markApi/finance/essay/findByPage", {
          limit: this.currentPage4,
          page: this.pageSize,
          count: this.count,
          title: "" + this.input,
          type: "" + this.typeValue,
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
          // this.$message.error('请求出错，请检查')
        });
    }
  }
};
</script>
<style scoped>
body {
  position: relative;
}
.demo-input-suffix {
  width: 200px;
  position: absolute;
  right: 380px;
  top: 20px;
}
.selected1 {
  position: absolute;
  top: 20px;
  right: 210px;
  width: 150px;
}
.selected2 {
  position: absolute;
  top: 20px;
  right: 40px;
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
.type {
  position: absolute;
  top: 82px;
  right: 30px;
}
.number {
  position: absolute;
  top: 185px;
  right: 30px;
}
.dialog-footer {
  position: absolute;
  bottom: 140px;
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
