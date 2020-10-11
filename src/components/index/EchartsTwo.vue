<template>
  <div>
    <div :span="12" id="myChart2" style="width: 300px;height: 400px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "echartsTwo",
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
      let myChart = echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      let option = {
        tooltip: {
          trigger: "axis",
          title: {
            text: "所有标的审核情况",
            left: "left"
          },
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          },
          y: 360
        },
        legend: {
          data: ["流标数", "通过数", "平均通过数"],
          orient: "vertical" /* 设置位置的垂直方向 */,
          right: 100,
          top: 0
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "标的新增数",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} 个"
            }
          },
          {
            type: "value",
            name: "通过数",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value} 个"
            }
          }
        ],
        series: [
          {
            name: "流标数",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ]
          },
          {
            name: "新增数",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          },
          {
            name: "平均通过数",
            type: "line",
            yAxisIndex: 1,
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2
            ]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped></style>
