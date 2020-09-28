<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input
              size="max"
              placeholder="搜索借款方"
              suffix-icon="el-icon-search"
              v-model="input4">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input
              size="max"
              placeholder="搜索借款人手机"
              suffix-icon="el-icon-search"
              v-model="input4">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select
              v-model="queryState"
              placeholder="请选择"
              style="width: 100%"
          >
            <el-option
                v-for="item in stateList"
                :label="item.name"
                :key="item.id"
                :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table
          :data="tableData"
          stripe
          style="width: 100%">
        <el-table-column
            prop="num"
            label="编号">
        </el-table-column>
        <el-table-column
            prop="borrower"
            label="借款方">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="借款人手机">
        </el-table-column>
        <el-table-column
            prop="entitle"
            label="标名">
        </el-table-column>
        <el-table-column
            prop="guarantee"
            label="担保机构">
        </el-table-column>
        <el-table-column
            prop="type"
            label="类型">
        </el-table-column>
        <el-table-column
            prop="money"
            label="借款金额">
        </el-table-column>
        <el-table-column
            prop="annual"
            label="年化利率">
        </el-table-column>
        <el-table-column
            prop="repayment"
            label="还款方式">
        </el-table-column>
        <el-table-column
            prop="deadline"
            label="期限">
        </el-table-column>
        <el-tale-column
            prop="created"
            label="添加时间">
        </el-tale-column>
        <el-table-column
            prop="state"
            label="状态">
        </el-table-column>
        <el-table-column
            prop="operation"
            label="操作">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      queryState:"",
      stateList: [
        {
          id: 1,
          name: "新增草稿"
        },
        {
          id: 2,
          name: "新标待审核"
        },
        {
          id: 3,
          name: "初审不通过"
        }
      ],
      tableData: [
        {
          num: 1,
          borrower: "新手一号",
          phone: "15222222",
          created: "2016-05-02",
          entitle: "新手一号",
          deadline: "2016-05-02",
          guarantee: "上海典当",
          type: "类型",
          money: "20000",
          annual: "12%",
          repayment: "按月付息",
          state: "待审核",
          name: "王小虎",
        }
      ]
    }
  },
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>