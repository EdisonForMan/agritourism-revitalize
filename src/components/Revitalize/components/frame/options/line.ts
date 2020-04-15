import echarts from "echarts";
const riseData = {
  x: ["2019.9", "2019.10", "2019.11", "2019.12", "2020.1", "2020.2", "2020.3"],
  s: [231, 478, 604, 1349, 209, 21, 38],
};
const riseOption = {
  name: "投资增长趋势",
  grid: {
    top: 20,
    left: 35,
    bottom: 30,
    right: 20,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(50,205,50,0.6)",
        type: "dashed",
      },
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(50,205,50,0.6)",
      },
    },
    axisLabel: { color: "rgba(0,0,0,0.5)" },
    data: riseData.x,
  },
  yAxis: {
    type: "value",
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(50,205,50,0.6)",
        type: "dashed",
      },
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(50,205,50,0.6)",
      },
    },
    axisLabel: { color: "rgba(0,0,0,0.5)" },
  },
  series: [
    {
      name: "最高水量",
      type: "line",
      //  smooth: true,
      //  symbol: "none", //去掉折线点
      itemStyle: {
        normal: {
          //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(81, 227, 35, 1)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(244, 244, 58, 1)", // 100% 处的颜色
            },
          ]), //背景渐变色
          // lineStyle: { // 系列级个性化折线样式
          //     width: 0.5,
          //     type: 'solid',
          //     color: "rgba(60,179,113,1)"
          // }
        },
      }, //线条样式
      symbolSize: 5, //折线点的大小
      areaStyle: {
        normal: {},
      },
      data: riseData.s,
    },
  ],
};

export { riseOption };
