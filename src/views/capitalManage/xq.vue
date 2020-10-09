<template>
  <div>
    <div>
      <el-row :gutter="20" id="yi">
        <el-col :span="2" :offset="2"
          ><div class="grid-content bg-purple"><h3>提现信息</h3></div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="4"
          ><div class="grid-content bg-purple">提现单号：</div></el-col
        >
        <el-col :span="6" :offset="4"
          ><div class="grid-content bg-purple">用户手机：</div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="4"
          ><div class="grid-content bg-purple">真实姓名：</div></el-col
        >
        <el-col :span="6" :offset="4"
          ><div class="grid-content bg-purple">用户类型：</div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="4"
          ><div class="grid-content bg-purple">提现银行：</div></el-col
        >
        <el-col :span="6" :offset="4"
          ><div class="grid-content bg-purple">银行账号：</div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="4"
          ><div class="grid-content bg-purple">提现手续费：</div></el-col
        >
        <el-col :span="6" :offset="4"
          ><div class="grid-content bg-purple">提交时间：</div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="4"
          ><div class="grid-content bg-purple">预计到账金额：</div></el-col
        >
        <el-col :span="6" :offset="4"
          ><div class="grid-content bg-purple">提交时间：</div></el-col
        >
      </el-row>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="2" :offset="2"
          ><div class="grid-content bg-purple"><h3>用户资产</h3></div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="4"
          ><div class="grid-content bg-purple">总资产：</div></el-col
        >
        <el-col :span="6" :offset="4"
          ><div class="grid-content bg-purple">冻结资金：</div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="4"
          ><div class="grid-content bg-purple">代收利息：</div></el-col
        >
        <el-col :span="6" :offset="4"
          ><div class="grid-content bg-purple">可提余额：</div></el-col
        >
      </el-row>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="4" :offset="2"
          ><div class="grid-content bg-purple">
            <h3>最近提现记录</h3>
          </div></el-col
        >
      </el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="银行账户" width="300">
        </el-table-column>
        <el-table-column prop="name" label="提现金额" width="300">
        </el-table-column>
        <el-table-column prop="address" label="提现时间"> </el-table-column>
        <el-table-column prop="name" label="状态" width="300">
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="4" :offset="2"
          ><div class="grid-content bg-purple"><h3>审核</h3></div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="4"
          ><div class="grid-content bg-purple">
            是否通过：
            <el-radio v-model="radio" label="1">通过</el-radio>
            <el-radio v-model="radio" label="2">不通过</el-radio>
          </div></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="4"
          ><div class="grid-content bg-purple">
            备注：
            <el-input placeholder="" v-model="input" clearable></el-input></div
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2" :offset="4"
          ><div class="grid-content bg-purple">
            <el-button type="primary" plain>通过</el-button>
          </div></el-col
        >
        <el-col :span="2" :offset="2"
          ><div class="grid-content bg-purple">
            <el-button plain>不通过</el-button>
          </div></el-col
        >
      </el-row>
    </div>
    <div style="height: 100vh; ">
      <el-scrollbar style="height: 100%;">
        <div style="height: 50opx;width: 100%;background: red;"></div>
        <div style="height: 50opx;width: 100%;background: yellowgreen;"></div>
        <div style="height: 50opx;width: 100%; background: blueviolet; "></div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      radio: "1",
      limit: 1,
      page: 5
    };
  },
  created() {
    this.$axios
      .post('/markApi/finance/rechargeRecord/selectAll',{
        limit: 5,
        page: 1
      })
      .then((req) => {
        console.log(req.data);
      })
      .catch((req) => {
        console.log(req);
      });
  },
  methods: {}
};
</script>>
<style scoped>
.el-row {
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
}
el-input {
  width: 500px;
  height: 500px;
}
</style>>
