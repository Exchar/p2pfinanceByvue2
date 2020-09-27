<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <el-input
          placeholder="搜索名称"
          prefix-icon="el-icon-search"
          v-model="input21">
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-input
          placeholder="搜索手机/用户名"
          prefix-icon="el-icon-search"
          v-model="input22">
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-select v-model="value" placeholder="请选择">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="4">
      <el-select v-model="value1" placeholder="请选择">
        <el-option
            v-for="item in options1"
            :key="item.value1"
            :label="item.label1"
            :value="item.value1">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="4">
      <el-select v-model="value2" placeholder="请选择">
        <el-option
            v-for="item in options2"
            :key="item.value2"
            :label="item.label2"
            :value="item.value2">
        </el-option>
      </el-select>
    </el-col>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="date"
          label="用户编号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="tel"
          label="手机/用户名">
      </el-table-column>
      <el-table-column
          prop="stateName"
          label="实名状态">
      </el-table-column>
      <el-table-column
          prop="IdCard"
          label="身份证号">
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别">
      </el-table-column>
      <el-table-column
          prop="moneyCard"
          label="银行卡">
      </el-table-column>
      <el-table-column
          prop="pushing"
          label="推荐人">
      </el-table-column>
      <el-table-column
          prop="state1"
          label="锁定状态">
      </el-table-column>
      <el-table-column
          prop="starTime"
          label="注册时间">
      </el-table-column>
      <el-table-column
          prop="RecentlyLogin"
          label="最近登陆">
      </el-table-column>
      <el-table-column
          prop="SourceUser"
          label="用户来源">
      </el-table-column>
      <el-table-column
          prop="fuck"
          label="操作">
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
export default {
  name: "postUse",
  data(){
    return{
      input21:"",
      options: [
        {
          value: '选项1',
          label: '全部实名状态'
        },
        {
          value: '选项2',
          label: '已认证'
        },
        {
          value: '选项3',
          label: '未认证'
        }],
      value: '',
      options1:[
        {
          value1:'选项1',
          label1:'全部状态'
        },
        {
          value1:'选项2',
          label1: '锁定'
        },
        {
          value1: '选项3',
          label1: '正常'
        }
      ],
      value1:'',
      options2:[
        {
          value2:'选项1',
          label2:'用户来源'
        },
        {
          value2: '选项2',
          label2: '网站'
        },
        {
          value2: '选项3',
          label2: 'Adnroid客户端'
        },
        {
          value2: '选项3',
          label2: 'ios客户端',
        },
        {
          value2: '选项4',
          label2: '其他渠道'
        }
      ],
      value2:'',
    };
  }
};

</script>

<style scoped>

</style>