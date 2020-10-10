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
    <el-select class="selected" v-model="stateValue" placeholder="请选择" @change="getfeedBackKeywords">
      <el-option label="全部" value=""></el-option>
      <el-option label="已处理" value="0"></el-option>
      <el-option label="待处理" value="1"></el-option>
    </el-select>
    <!--表格-->
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="idea" label="意见建议" width="260"></el-table-column>
      <el-table-column prop="phone" label="反馈者手机" width="130"></el-table-column>
      <el-table-column prop="type" label="手机型号" width="130"></el-table-column>
      <el-table-column prop="source" label="来源" width="130"></el-table-column>
      <el-table-column prop="time" label="提交时间" width="200"></el-table-column>
      <el-table-column prop="reply" label="回复" width="130"></el-table-column>
      <el-table-column prop="state" label="状态" width="130"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
              class="button1"
              size="mini"
              type="primary"
              @click="handle(scope.$index, scope.row)">处理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--编辑对话框-->
    <el-dialog title="处理" :visible.sync="dialogFormEditVisible">
      <el-form :model="editform" ref="editform">
        <el-form-item label="意见建议">
          <el-input v-model="editform.idea" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="反馈者手机">
          <el-input v-model="editform.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机型号">
          <el-input v-model="editform.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="来源">
          <el-input v-model="editform.source" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="提交时间">
          <el-input v-model="editform.time" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="回复">
          <el-input v-model="editform.reply" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="selStatus">
          <br/>
          <el-select v-model="editform.state" autocomplete="off">
            <el-option label="已处理" value="0"></el-option>
            <el-option label="待处理" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="dialogFormEditVisible = false">取 消</el-button>
        <el-button class="save" type="primary" @click="saveDept">保 存</el-button>
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
  name: "feedBack",
  data: function () {
    return {
      input: '',
      stateValue: '',
      currentPage4: 1,
      pageSize: 6,
      count: 6,
      tableData:[{
        id: '',
        idea: '',
        phone: '',
        type: '',
        source: '',
        time: '',
        reply: '',
        state: ''
      }],
      dialogFormEditVisible: false,
      editform: {
        id: '',
        idea: '',
        phone: '',
        type: '',
        source: '',
        time: '',
        reply: '',
        state: ''
      }
    };
  },
  created() {
    this.getfeedBackList();
  },
  methods:{
    handleSizeChange(val) {
      this.pageSize = val;
      this.getfeedBackKeywords()
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.getfeedBackKeywords()
    },
    getfeedBackList: function () {
      //向后端服务器去请求数据
      this.$axios.post("/markApi/finance/idea/findByPage",{
        page: 7,
        limit: 1,
      }).then((response) => {
        console.log(response)
        var result = response.data
        if (result.code === "200") {
          this.tableData = response.data.data
          console.log(this.tableData)
        } else {
          this.$alert(result.message)
        }
      }).catch((error) => {
        console.log(error);
      })
    },
    handle(index, obj) {
      this.dialogFormEditVisible = true
      this.editform.id = obj.id
      this.editform.idea = obj.idea
      this.editform.phone = obj.phone
      this.editform.type = obj.type
      this.editform.source = obj.source
      this.editform.time = obj.time
      this.editform.reply = obj.reply
      this.editform.state = obj.state
    },
    saveDept: function () {
      // 将修改的数据发给服务器，接收服务器的响应并进行处理
      this.$axios.post('http://172.16.5.177:8080/finance/idea/update', {
        id: this.editform.id,
        idea: this.editform.idea,
        phone: this.editform.phone,
        type: this.editform.type,
        source: this.editform.source,
        time: this.editform.time,
        reply: this.editform.reply,
        state: this.editform.state
      }).then((response) => {
        var result = response.data
        if (result.code === '200') {
          this.$message.success('处理成功')
          this.getfeedBackList()
          this.dialogFormEditVisible = false
        } else {
          this.$message.error(result.message)
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('请求出错')
      })
    },
    getfeedBackKeywords: function () {
      this.$axios.post('/markApi/finance/idea/findByPage', {
        limit: this.currentPage4,
        page: this.pageSize,
        idea: ""+this.input,
        state: ""+this.stateValue
      }).then((response) => {
        var result = response.data
        console.log(response)
        if (result.code === '200') {
          this.tableData = result.data
        } else {
          this.$message.error(result.message)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
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
  position: absolute;
  top: 80px;
  left: 20px;
  width: 100%;
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
  bottom: 60px;
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
