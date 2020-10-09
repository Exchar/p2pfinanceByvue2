<template>
  <div>
    <div class="add">
      <el-button @click="changeStateAdd">添加分类</el-button>
    </div>

    <el-dialog
      :title="isadd ? '添加分类' : '修改分类'"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="form"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称">
          <el-input v-model="form.cname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.cstate" placeholder="请选择活动区域">
            <el-option label="有效" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="adddebit"
          v-show="isadd"
          :disabled="!isDisable"
          >保存</el-button
        >
        <el-button type="primary" @click="saveEdit(form)" v-show="!isadd"
          >修改</el-button
        >
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="tableData"
      style="width: 90%;margin:auto"
      v-loading="loading"
      height="600px"
      align="center"
    >
      <el-table-column prop="cname" label="分类名称" width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        width="180"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column prop="cstate" label="状态" width="180" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.cstate == 1 ? 'statusActive' : 'statusDel'">{{
            scope.row.cstate == 1 ? "有效" : "禁用"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="caozuo" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <div id="action">
            <div id="btn">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="changeStateEdit(scope.row)"
              ></el-button>
            </div>
            <div>
              <el-switch
                v-model="scope.row.cstate"
                active-text="有效"
                inactive-text="禁用"
                @change="changeCstate(scope.$index, scope.row)"
              ></el-switch>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "debitCategory",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        id: "",
        cname: "",
        sort: "",
        cstate: ""
      },
      loading: false,
      formLabelWidth: "120px",
      tableData: [],
      isadd: 1
    };
  },
  computed: {
    isDisable() {
      if (this.form.cname != "" && this.form.sort != "") {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted: function() {
    this.gedebitList();
  },
  methods: {
    changeAvi(index, row) {
      console.log(index, row, row.cstate);
    },
    changeAdd() {
      this.isadd = 1;
    },
    changeEdit() {
      this.isadd = 0;
    },
    changedialog() {
      this.dialogFormVisible = true;
    },
    changeStateAdd() {
      this.changeAdd();
      this.form.cname = "";
      this.form.sort = "";
      this.form.cstate = "";
      this.changedialog();
    },
    changeStateEdit(row) {
      this.changeEdit();
      this.changedialog();
      this.editdebit(row);
    },
    //添加
    adddebit: function() {
      this.$axios
        .post("/markApi/finance/category/insert", {
          cname: this.form.cname,
          sort: this.form.sort,
          cstate: this.form.cstate
        })
        .then(response => {
          if (response.data.code == 200) {
            this.$message(response.data.msg);
            if (response.data.msg == "成功") {
              this.gedebitList();
            }
            this.dialogFormVisible = false;
          } else {
            this.$message(response.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$alert("请求出错");
        });
    },
    //修改
    editdebit: function(obj) {
      this.dialogFormVisible = true;
      this.form.cname = obj.cname;
      this.form.sort = obj.sort;
      this.form.cstate = Number(obj.cstate);
      this.form.id = obj.id;
    },
    saveEdit(form) {
      console.log(form);
      this.$axios
        .post("/markApi/finance/category/update", {
          id: this.form.id,
          cname: this.form.cname,
          sort: this.form.sort,
          cstate: Number(this.form.cstate)
        })
        .then(response => {
          const result = response.data;
          if (result.code == 200) {
            if (result.msg == "成功") {
              console.log(result);
              this.$message(result.msg);
              this.gedebitList();
              this.dialogFormVisible = false;
            }
          } else {
            this.$msg(result.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$alert("请求出错，请检查");
        });
    },
    //改变状态
    changeCstate: function(i, row) {
      this.$axios
        .post("/markApi/finance/category/forbidden", {
          id: row.id,
          cstate: Number(row.cstate)
        })
        .then(response => {
          if (response.data.code == 200) {
            this.gedebitList();
            this.$message({
              type: "success",
              message: response.data.msg,
              duration: 500
            });
          } else {
            this.$message(response.data.msg);
          }
        })
        .catch(() => {
          this.$alert("请求出错");
        });
    },
    gedebitList: function() {
      this.loading = true;
      this.$axios
        .post("/markApi/finance/category/findAll")
        .then(response => {
          if (response.data.code == 200) {
            response.data.data.forEach(v => {
              v.cstate = Boolean(v.cstate);
            });
            this.tableData = response.data.data;
            this.loading = false;
          } else {
            this.$message(response.data.msg);
            this.loading = false;
          }
        })
        .catch(() => {
          this.$alert("请求出错");
        });
    }
  }
};
</script>
<style scoped>
.el-dialog__footer {
  text-align: center;
}
.statusActive {
  padding: 5px 10px;
  color: green;
}
.statusDel {
  padding: 5px 10px;
  color: gray;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
#btn {
  margin-right: 10px;
}
#action {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.add {
  width: 90%;
  margin: auto;
}
.el-button {
  margin-bottom: 10px;
  margin-top: 20px;
}
</style>
