<template>
  <div>
    <div>
      <el-button type="primary" @click="jump">+ 添加轮播广告</el-button>
    </div>
    <div class="demo-input-suffix">
      <el-input
        placeholder="搜索轮播标题"
        prefix-icon="el-icon-search"
        v-model="input"
        @keyup.native="getSliderTitleList"
      >
      </el-input>
    </div>
    <el-select
      class="selected1"
      v-model="positionValue"
      placeholder="请选择"
      @change="getSliderTitleList"
    >
      <el-option label="全部位置" value=""></el-option>
      <el-option label="首页轮播" value="首页轮播"></el-option>
      <el-option label="PC端首页轮播" value="PC端首页轮播"></el-option>
      <el-option label="主机端首页轮播" value="主机端首页轮播"></el-option>
      <el-option label="移动端首页轮播" value="移动端首页轮播"></el-option>
      <el-option label="商城轮播" value="商城轮播"></el-option>
    </el-select>
    <el-select
      class="selected2"
      v-model="provinceValue"
      placeholder="请选择"
      @change="getSliderTitleList"
    >
      <el-option label="全部区域" value=""></el-option>
      <el-option label="不限制" value=""></el-option>
      <el-option label="广东省" value="广东省"></el-option>
      <el-option label="四川省" value="四川省"></el-option>
      <el-option label="北京市" value="北京市"></el-option>
      <el-option label="甘肃省" value="甘肃省"></el-option>
    </el-select>
    <el-select
      class="selected3"
      v-model="stateValue"
      placeholder="请选择"
      @change="getSliderTitleList"
    >
      <el-option label="全部状态" value=""></el-option>
      <el-option label="上架" value="0"></el-option>
      <el-option label="下架" value="1"></el-option>
    </el-select>
    <!--表格-->
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="picture" label="轮播图" width="260"></el-table-column>
      <el-table-column prop="title" label="标题" width="110"></el-table-column>
      <el-table-column prop="position" label="轮播位置" width="140"></el-table-column>
      <el-table-column prop="starttime" label="开始时间" width="140"></el-table-column>
      <el-table-column prop="finishtime" label="结束时间" width="140"></el-table-column>
      <el-table-column prop="number" label="排序" width="110"></el-table-column>
      <el-table-column prop="province" label="区域" width="110"></el-table-column>
      <el-table-column prop="state" label="状态" width="110"></el-table-column>
      <el-table-column label="操作" width="140">
        <template slot-scope="scope">
          <el-button
            class="button1"
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑
          </el-button>
          <el-button
            class="button2"
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--编辑对话框-->
    <el-dialog title="编辑" :visible.sync="dialogFormEditVisible">
      <el-form :model="editform" ref="editform">
        <el-form-item label="轮播图">
          <el-input v-model="editform.picture" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="editform.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="轮播位置">
          <el-input v-model="editform.position" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-input v-model="editform.starttime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="editform.finishtime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="editform.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="区域">
          <el-input v-model="editform.province" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="selStatus">
          <br />
          <el-select v-model="editform.state" autocomplete="off">
            <el-option label="上架" value="0"></el-option>
            <el-option label="下架" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="dialogFormEditVisible = false"
          >取 消
        </el-button>
        <el-button class="save" type="primary" @click="saveDept"
          >保 存
        </el-button>
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
export default {
  name: "rotationManage",
  data: function() {
    return {
      input: "",
      positionValue: "",
      provinceValue: "",
      stateValue: "",
      currentPage4: 1,
      pageSize: 6,
      count: 6,
      tableData: [
        {
          id: "",
          picture: "",
          title: "",
          position: "",
          starttime: "",
          finishtime: "",
          number: "",
          province: "",
          state: ""
        }
      ],
      dialogFormEditVisible: false,
      editform: {
        id: "",
        picture: "",
        title: "",
        position: "",
        starttime: "",
        finishtime: "",
        number: "",
        province: "",
        state: ""
      }
    };
  },
  created() {
    this.getSliderTitleList();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSliderTitleList();
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.getSliderTitleList();
    },
    getSliderList: function() {
      //向后端服务器去请求数据
      this.$axios
        .post("/markApi/finance/ad/findByPage", {
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
            this.$message.error(result.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    jump() {
      this.$router.push("/addSlider");
    },
    handleEdit(index, obj) {
      this.dialogFormEditVisible = true;
      this.editform.id = obj.id;
      this.editform.picture = obj.picture;
      this.editform.title = obj.title;
      this.editform.position = obj.position;
      this.editform.starttime = obj.starttime;
      this.editform.finishtime = obj.finishtime;
      this.editform.number = obj.number;
      this.editform.province = obj.province;
      this.editform.state = obj.state;
    },
    saveDept: function() {
      // 将修改的数据发给服务器，接收服务器的响应并进行处理
      this.$axios
        .post("http://172.16.5.177:8080/finance/ad/update", {
          id: this.editform.id,
          picture: this.editform.picture,
          title: this.editform.title,
          position: this.editform.position,
          starttime: this.editform.starttime,
          finishtime: this.editform.finishtime,
          number: this.editform.number,
          province: this.editform.province,
          state: this.editform.state
        })
        .then(response => {
          var result = response.data;
          if (result.code === "200") {
            this.$message.success("编辑成功");
            this.getSliderTitleList();
            this.dialogFormEditVisible = false;
          } else {
            this.$message.error(result.message);
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
        .post("http://172.16.5.177:8080/finance/ad/delete", {
          id: val.id
        })
        .then(response => {
          var result = response.data;
          console.log(response);
          if (result.code === "200") {
            if (result.msg === "删除成功") {
              this.getSliderList();
            } else {
              this.$message.error(result.message);
            }
          } else {
            this.$message.error(result.message);
          }
        })
        .catch(() => {
          this.$message.error("请求出错,请检查");
        });
    },
    getSliderTitleList: function() {
      this.$axios
        .post("/markApi/finance/ad/findByPage", {
          limit: this.currentPage4,
          page: this.pageSize,
          title: "" + this.input,
          position: "" + this.positionValue,
          province: "" + this.provinceValue,
          state: "" + this.stateValue
        })
        .then(response => {
          var result = response.data;
          console.log(response);
          if (result.code === "200") {
            this.tableData = result.data;
          } else {
            this.$message.error(result.message);
          }
        })
        .catch(error => {
          console.log(error);
          // this.$message.error('请求出错,请检查')
        });
    }
  }
};
</script>
<style scoped>
body {
  position: relative;
}
.el-button {
  position: absolute;
  top: 20px;
  left: 20px;
}
.demo-input-suffix {
  width: 200px;
  position: absolute;
  right: 550px;
  top: 20px;
}
.selected1 {
  position: absolute;
  top: 20px;
  right: 380px;
  width: 150px;
}
.selected2 {
  position: absolute;
  top: 20px;
  right: 210px;
  width: 150px;
}
.selected3 {
  position: absolute;
  top: 20px;
  right: 40px;
  width: 150px;
}
.el-table {
  position: absolute;
  top: 80px;
  left: 20px;
  width: 100%;
}
.button1 {
  margin: -10px -10px;
}
.button2 {
  margin: -10px 50px;
}
.el-pagination {
  position: absolute;
  top: 550px;
  right: 50px;
}
.el-dialog {
  position: relative;
}
.dialog-footer {
  position: absolute;
  bottom: 80px;
  left: 20px;
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
