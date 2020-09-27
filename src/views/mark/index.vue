<template>
  <div class="maintain">
    <div id="nav">
      <el-form>
        <el-form-item prop="region">
          <el-row :gutter="20">
            <el-col :span="4"><div class="grid-content">
              <el-input
                      placeholder="请输入借款方"
                      suffix-icon="el-icon-search"
                      v-model="input1">
              </el-input>
            </div></el-col>
            <el-col :span="4"><div class="grid-content">
              <el-input
                      placeholder="请输入借款人手机"
                      suffix-icon="el-icon-search"
                      v-model="input2">
              </el-input>
            </div></el-col>
            <el-col :span="4"><div class="grid-content">
              <el-select placeholder="全部类型">
                <el-option label="车抵押" value="car"></el-option>
                <el-option label="房抵押" value="house"></el-option>
                <el-option label="民品抵押" value="thing"></el-option>
              </el-select>
            </div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div id="table">
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
                prop="phoneNum"
                label="借款人手机">
        </el-table-column>
        <el-table-column
                prop="markName"
                label="标名">
        </el-table-column>
        <el-table-column
                prop="guarantee"
                label="担保机构"
                width="180">
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
                prop="rate"
                label="年利率化">
        </el-table-column>
        <el-table-column
                prop="repayType"
                label="还款方式">
        </el-table-column>
        <el-table-column
                prop="term"
                label="期限">
        </el-table-column>
        <el-table-column
                prop="checkTime"
                label="审核时间">
        </el-table-column>
        <el-table-column
                prop="state"
                label="状态">
        </el-table-column>
        <el-table-column
                prop="action"
                label="操作">
        </el-table-column>
      </el-table>
    </div>
    <div id="page">
      <el-row>
        <el-col :span="6"><div></div></el-col>
        <el-col :span="6"><div></div></el-col>
        <el-col :span="10"><div>
          <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[20, 40, 60, 80]"
                  :page-size="20"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="100">
          </el-pagination>
        </div></el-col>
        <el-col :span="2"><div></div></el-col>
      </el-row>

    </div>
  </div>
</template>

<script>

  export default {
    name: "MarkOn",
    data() {
      return {
        input1: '',
        input2: '',
        currentPage: 1
      }
    },
  /*  methods: {
      getData(){
        this.$axios.get('http://172.16.5.177:8080')
                .then(function (res) {
                  console.log(res)
                })
                .catch(function (error) {
                  console.log(error)
                });
      },*/
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
</script>
<style scoped>
  .el-col-6{
    margin-top: 20px;
    height: 40px;
  }
  #nav{
    padding: 10px;
  }
  #table{
    width: 100%;
    height: 470px;
  }
</style>
