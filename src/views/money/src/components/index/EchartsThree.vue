<template>
  <div>
    <div :span="12" id="myChart3" style="width: 300px;height: 450px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "echartsOne",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart3"));
      // 配置
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      };
      //加载配置，开始绘制
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped></style>
