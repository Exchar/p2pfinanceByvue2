<template>
  <div class="contentMain">
    <div>
      <el-row class="dataShow" :gutter="20">
        <h3 class="actionNorTit">项目概况</h3>
        <el-row class="dataState">
          <el-col :span="6">
            <el-row>
              <p>注册用户（人）</p>
              <p>9857</p>
              <p>昨日新增：5人</p>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <p>投资总额（万元）</p>
              <p>9857.02</p>
              <p>昨日新增：5万元</p>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <p>借款总额（万元）</p>
              <p>5324.99</p>
              <p>昨日新增：5万元</p>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <p>用户累计收益（万元）</p>
              <p>6589.25</p>
              <p>昨日新增：5万元</p>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="dataShow">
        <h3 class="actionNorTit">待办事项</h3>
        <el-row class="dataState">
          <el-col :span="4">
            <p>新标待审</p>
            <p>10</p>
          </el-col>
          <el-col :span="4">
            <p>新标待上架</p>
            <p>16</p>
          </el-col>
          <el-col :span="4">
            <p>满标复审</p>
            <p>16</p>
          </el-col>
          <el-col :span="4">
            <p>今日待还款</p>
            <p>25</p>
          </el-col>
          <el-col :span="4">
            <p>提现待审</p>
            <p>30</p>
          </el-col>
          <el-col :span="4">
            <p>提现待处理</p>
            <p>50</p>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="actionMenu" :gutter="20">
        <h3 class="actionNorTit">常用功能</h3>
        <el-col
          :span="2"
          v-for="(item, index) in actionMenuData"
          :key="index"
          class="colItem"
          disabled
        >
          <div
            class="actionMenuItem"
            style="text-align: center;cursor: pointer"
            @click="linkGo(item.path)"
          >
            <div
              style="text-align: center"
              class="iconOUt"
              :style="'background-color:' + item.bgColor"
            >
              <i :class="item.icon" class="iconIn"></i>
            </div>
            <p style="text-align: center" class="iconBot">
              {{ item.title }}
            </p>
          </div>
        </el-col>
        <el-col :span="2">
          <div
            class="actionMenuItem"
            style="text-align: center;cursor: pointer"
            @click="centerDialogVisible = true"
          >
            <div
              style="text-align: center; background-color:#eeeeee"
              class="iconOUt"
            >
              <i class="iconIn el-icon-plus"></i>
            </div>
            <p style="text-align: center" class="iconBot">
              管理快捷方式
            </p>
          </div>
        </el-col>
      </el-row>
      <el-row class="mainContent" :gutter="20">
        <el-col :span="17" class="indexChart">
          <h3 class="actionNorTit">数据情况</h3>
          <div style="width: 100%">
            <!--          echart图-->
            <el-row>
              <el-col :span="12"><EchartsOne></EchartsOne></el-col>
              <el-col :span="12"><EchartsTwo></EchartsTwo></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><EchartsThree></EchartsThree></el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="7" style="padding-right: 0">
          <div class="message">
            <el-row>
              <p class="actionNorTit">消息通知</p>
              <el-row v-for="item in messages" :key="item.index" :span="24">
                <el-row>
                  <el-col :span="24">{{ item.msg }}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">{{ item.time }}</el-col>
                </el-row>
              </el-row>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <!--      对话框-->
      <el-dialog
        title="可以添加的快捷方式"
        :visible.sync="centerDialogVisible"
        width="40%"
        center
      >
        <!--        穿梭框-->
        <el-transfer
          v-model="value"
          :props="{
            key: 'path',
            label: 'title'
          }"
          :data="data"
          @change="transChange"
        >
        </el-transfer>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="subBtnClick">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import preventBack from "vue-prevent-browser-back";
import EchartsOne from "@/components/index/EchartsOne";
import EchartsTwo from "@/components/index/EchartsTwo";
import EchartsThree from "@/components/index/EchartsThree";
import "../../assets/index/main.css";
import "../../assets/xnoScoll.css";
export default {
  name: "index",
  mixins: [preventBack],
  components: {
    EchartsOne,
    EchartsTwo,
    EchartsThree
  },
  data() {
    return {
      centerDialogVisible: false,
      value: [],
      messages: [
        {
          msg: "您有一条新消息",
          time: "2020-9-15 XX-XX-XX"
        },
        {
          msg: "您有一条新的审核待通过",
          time: "2020-9-15 XX-XX-XX"
        },
        {
          msg: "一条新的申请待通过",
          time: "2020-9-15 XX-XX-XX"
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      "getShortcuts",
      "getMenuData",
      "getShortcutsAll",
      "getHeaderTabs",
      "getShortCutsInit",
      "getShortDefaultChecked"
    ]),
    actionMenuData() {
      return this.getShortCutsInit.concat(this.getShortcuts);
    },
    data() {
      return this.getShortcutsAll;
    }
  },
  methods: {
    //在一个数组中随机选取一个元素
    randomChoice(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    linkGo(ment) {
      console.log(ment);
      this.changeNowAct(ment);
      this.$router.push(ment);
      let addItem = true;
      let tabItems = this.getHeaderTabs;
      console.log(tabItems);
      tabItems.forEach(v => {
        if (v.path === ment) {
          addItem = false;
        }
      });
      addItem ? this.saveTabItem(ment) : "";
    },
    ...mapMutations([
      "addshortcut",
      "saveLeftMenu",
      "saveTabItem",
      "changeNowAct",
      "setDefaultChecked",
      "clearShort"
    ]),
    transChange(v) {
      console.log(v);
    },
    subBtnClick() {
      this.centerDialogVisible = false;
      console.log(this.value);
      //添加快捷方式
      if (this.value.length > 0) {
        this.addshortcut(
          this.getShortcutsAll.filter(v => {
            return this.value.includes(v.path);
          })
        );
        //添加完成之后设置默认
        this.setDefaultChecked(this.value);
      } else {
        this.clearShort();
      }
    }
  },
  created() {
    //console.log(this.getShortcuts);
    this.value = [...this.getShortDefaultChecked];
  },
  mounted() {
    //拉取图表数据
    // this.$axios.post("/testApi/indexInfo").then((res)=>{
    //   console.log(res.data);
    //   this.$message({
    //     type:"success",
    //     message:"成功拉取首页数据",
    //     duration:500
    //   })
    // }).catch((err)=>{
    //   console.log(err);
    //   this.$message.error("请求数据失败")
    // })
  }
};
</script>

<style scoped>
.iconOUt {
  width: 60px;
  height: 60px;
  margin: auto;
  position: relative;
  border-radius: 2px;
}
.iconIn {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 50%;
  height: 50%;
  font-size: 1.4em;
}
.dataShow{
  margin: 0 -10px;
  padding-left: 24px;
}
.actionMenu {
  padding: 2px 20px 2px 20px;
}
.dataState{
  padding: 12px 10px;
}
.dataState>.el-col>p:last-of-type{
  color: rgb(204, 112, 0);
  font-size: 1.4em;
}
.iconBot {
  font-size: 0.9em;
}
.actionNorTit {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 1em;

  font-weight: 600 !important;
  margin-left: 10px;
}
.contentMain > div > .el-row:nth-of-type(3),
.indexChart,
.message ,.dataShow{
  background-color: #ffffff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.25), 0 0 6px rgba(0, 0, 0, 0.04);
}
.message {
  box-sizing: border-box;
  padding: 6px 30px 30px 30px;
  font-weight: 500 !important;
  height: 200px;
  width: 100%;
}
.contentMain > div > .el-row {
  box-sizing: border-box;
}
.contentMain > div > .el-row:not(:first-of-type) {
  margin-top: 10px;
}
.contentMain > div {
  padding: 0 8px 0 8px;
}
.indexChart {
  padding: 2px 2px 2px 24px !important;
}
.message {
}
.dataState .el-row>p:nth-of-type(1){
  font-size: 1.2em;
}
.dataState .el-row>p:nth-of-type(2){
  font-size: 1.6em;
  color: rgb(204,102,0);
}
.dataState .el-row>p:nth-of-type(3){
  color: rgb(153,169,201);
}
</style>
