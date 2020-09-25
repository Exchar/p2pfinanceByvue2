<template>
  <div class="maintain">
    <div id="nav">
      <el-form>
        <el-form-item prop="region">
          <el-input
            placeholder="请输入借款方"
            suffix-icon="el-icon-search"
            v-model="input1"
          >
          </el-input>
          <el-input
            placeholder="请输入借款人手机"
            suffix-icon="el-icon-search"
            v-model="input2"
          >
          </el-input>
          <el-select placeholder="全部类型">
            <el-option label="车抵押" value="car"></el-option>
            <el-option label="房抵押" value="house"></el-option>
            <el-option label="民品抵押" value="thing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div id="table">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="num" label="编号" width="180"> </el-table-column>
        <el-table-column prop="borrower" label="借款方"> </el-table-column>
        <el-table-column prop="phoneNum" label="借款人手机" width="180">
        </el-table-column>
        <el-table-column prop="markName" label="标名"> </el-table-column>
        <el-table-column prop="guarantee" label="担保机构" width="180">
        </el-table-column>
        <el-table-column prop="type" label="类型"> </el-table-column>
        <el-table-column prop="money" label="借款金额" width="180">
        </el-table-column>
        <el-table-column prop="rate" label="年利率化"> </el-table-column>
        <el-table-column prop="repayType" label="还款方式" width="180">
        </el-table-column>
        <el-table-column prop="term" label="期限"> </el-table-column>
        <el-table-column prop="checkTime" label="审核时间" width="180">
        </el-table-column>
        <el-table-column prop="state" label="状态"> </el-table-column>
        <el-table-column prop="action" label="操作"> </el-table-column>
      </el-table>
    </div>
    <div id="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[25, 50, 75, 100]"
        :page-size="25"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import "../../assets/style.css";

export default {
  name: "MarkOn",
  data() {
    return {
      input1: "",
      input2: "",
      tableData: [
        {
          num: "201709092213",
          borrower: "企业一号",
          phoneNum: "13800009999",
          markName: "新手一号",
          guarantee: "上海这润典当",
          type: "续贷",
          money: "￥20000",
          rate: "11.5%",
          repayType: "按月付息",
          term: "5天",
          checkTime: "2017/09/10",
          state: "待上架",
          action: "上架",
          currentPage4: 4
        },
        {
          num: "201709092213",
          borrower: "企业一号",
          phoneNum: "13800009999",
          markName: "新手一号",
          guarantee: "上海这润典当",
          type: "续贷",
          money: "￥20000",
          rate: "11.5%",
          repayType: "按月付息",
          term: "5天",
          checkTime: "2017/09/10",
          state: "待上架",
          action: "上架",
          currentPage4: 4
        }
      ]
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style scoped>
#mav {
  display: flex;
}
#page {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.el-pagination .el-select .el-input .el-input__inner {
  width: 90px !important;
  text-align: center;
}
</style>
