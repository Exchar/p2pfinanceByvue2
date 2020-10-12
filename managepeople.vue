<template>
  <div>
    <div class="searchtop">
      <el-button
        type="success"
        icon="el-icon-circle-plus"
        @click="dialogFormVisible = true"
      ></el-button>
      <el-input
        v-model="jobid"
        placeholder="请输入工号"
        class="search"
        clearable
        @clear="getDeptList"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="getDeptList"
      ></el-button>
      <el-button type="danger" class="dell" @click="del(ids)">删除</el-button>
    </div>
    <el-table
      :data="Manageperson"
      border
      style="width: 1400px"
      @select="checkone"
      @select-all="checkall"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="jobNumber" label="工号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="tel" label="手机号码"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">{{
          scope.row.type == 0
            ? "管理人员"
            : scope.row.type == 1
            ? "客服"
            : "配送员"
        }}</template>
      </el-table-column>
      <el-table-column prop="idCard" label="身份证号码"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="edit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="del(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pageSizeArr"
      :page-size="pageSize"
      :total="total"
    >
    </el-pagination>
    <!-- 添加对话框 -->
    <el-dialog title="添加员工" :visible.sync="dialogFormVisible" top="4vh">
      <el-form :model="addform">
        <el-form-item label="工号">
          <el-input v-model="addform.jobNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="addform.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别" class="selstatus">
          <br />
          <el-select
            v-model="addform.type"
            select="addform.type"
            autocomplete="off"
          >
            <el-option label="管理人员" :value="0"></el-option>
            <el-option label="客服" :value="1"></el-option>
            <el-option label="配送员" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="addform.idCard" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDept">添 加</el-button>
      </div>
    </el-dialog>

    <!-- 修改对话框 -->
    <el-dialog title="修改员工" :visible.sync="dialogFormEditVisible" top="4vh">
      <el-form :model="editform">
        <el-form-item label="工号">
          <el-input v-model="editform.jobNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="editform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="editform.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别" class="selstatus">
          <br />
          <el-select
            v-model="editform.type"
            select="editform.type"
            autocomplete="off"
          >
            <el-option label="管理人员" :value="0"></el-option>
            <el-option label="客服" :value="1"></el-option>
            <el-option label="配送员" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="editform.idCard" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDept">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "managepeople",
  data() {
    return {
      dialogFormEditVisible: false,
      dialogFormVisible: false,
      ids: "",
      jobid: "",
      Manageperson: [],
      pageSize: 6,
      pageSizeArr: [6, 12, 18],
      page: 1,
      total: 0,
      addform: {
        jobNumber: "",
        name: "",
        password: "",
        tel: "",
        idCard: "",
        type: 0,
      },
      editform: {
        id: "",
        jobNumber: "",
        name: "",
        password: "",
        tel: "",
        type: 0,
        idCard: "",
      },
    };
  },
  props: {},
  components: {},
  mounted() {
    this.getDeptList();
  },
  methods: {
    checkone(selection) {
      var jobids = [];
      for (var i = 0; i < selection.length; i++) {
        jobids.push(selection[i].id);
      }
      this.ids = jobids.join(",");
    },
    checkall(selection) {
      var jobids = [];
      for (var i = 0; i < selection.length; i++) {
        jobids.push(selection[i].id);
      }
      this.ids = jobids.join(",");
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDeptList();
    },
    handleCurrentChange(val) {
      // 保存当前页码
      this.page = val;
      // 调用分页函数
      this.getDeptList();
    },
    getDeptList() {
      this.$axios
        .post("/api/Deptlist", {
          page: this.page,
          pageSize: this.pageSize,
          jobid: this.jobid,
        })
        .then((res) => {
          var result = res.data;
          if (result.code === 200) {
            this.Manageperson = result.data;
            this.total = result.total;
            this.page = Math.min(
              this.page,
              Math.ceil(result.total / this.pageSize)
            );
            if (this.page < 1) {
              this.page = 1;
            }
          } else {
            this.$alert(result.message);
          }
        })
        .catch(() => {});
    },
    del(id) {
      if (id == "") {
        this.$alert("请选择删除数据");
        return false;
      }

      this.$axios({
        url: "/api/delDept",
        method: "POST",
        data: {
          id: id,
        },
      })
        .then((res) => {
          var result = res.data;
          if (result.message === "删除成功") {
            this.getDeptList();
          } else {
            this.$alert(result.message);
          }
        })
        .catch(() => {
          this.$alert("请求出错，请检查");
        });
    },
    addDept() {
      this.$axios
        .post("/api/addDept", {
          jobNumber: this.addform.jobNumber,
          name: this.addform.name,
          password: this.addform.password,
          tel: this.addform.tel,
          idCard: this.addform.idCard,
          type: this.addform.type,
        })
        .then((res) => {
          var result = res.data;
          if (result.code === 200) {
            this.$alert(result.message);
            if (result.message === "添加成功") {
              this.addform.jobNumber = "";
              this.addform.name = "";
              this.addform.password = "";
              this.addform.tel = "";
              this.addform.idCard = "";
              this.addform.type = 0;
              this.getDeptList();
            }
            this.dialogFormVisible = false;
          } else {
            this.$alert(result.message);
          }
        })
        .catch(() => {
          this.$alert("请求出错，请检查");
        });
    },
    saveDept() {
      this.$axios
        .post("/api/editDept", {
          id: this.editform.id,
          jobNumber: this.editform.jobNumber,
          name: this.editform.name,
          password: this.editform.password,
          tel: this.editform.tel,
          idCard: this.editform.idCard,
          type: this.editform.type,
        })
        .then((res) => {
          var result = res.data;
          if (result.message === "修改成功") {
            this.$alert(result.message);
            this.getDeptList();

            this.dialogFormEditVisible = false;
          } else {
            this.$alert(result.message);
          }
        })
        .catch(() => {
          this.$alert("请求出错，请检查");
        });
    },
    edit(obj) {
      this.dialogFormEditVisible = true;
      this.editform.id = obj.id;
      this.editform.jobNumber = obj.jobNumber;
      this.editform.name = obj.name;
      this.editform.password = obj.password;
      this.editform.tel = obj.tel;
      this.editform.idCard = obj.idCard;
      this.editform.type = obj.type;
    },
  },
  watch: {
    page() {
      this.getDeptList();
    },
  },
};
</script>

<style  scoped>
.el-table {
  margin: auto;
  max-height: 509px;
  min-height: 509px;
  background-color: white;
}
.has-gutter {
  height: 50px;
}
.search {
  width: 500px;
  margin: 0 5px;
}
.searchtop {
  margin-bottom: 10px;
}
.el-dialog__wrapper {
  overflow: hidden !important;
}
</style>