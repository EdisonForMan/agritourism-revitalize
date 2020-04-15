const projectBarOption = {
  tooltip: {
    show: true,
    formatter: "{b}:{c}",
  },
  grid: {
    top: 20,
    left: 15,
    bottom: 10,
    right: 20,
    containLabel: true,
  },
  xAxis: {
    type: "value",
    position: "bottom",
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
        type: "solid",
      },
    },
    axisLabel: { color: "rgba(0,0,0,0.5)" },
  },
  yAxis: [
    {
      type: "category",
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
          type: "solid",
        },
      },
      axisLabel: { color: "rgba(0,0,0,0.5)" },
      data: ["first", "two", "three", "four"],
    },
  ],
  series: [
    {
      name: "能耗值",
      type: "bar",
      itemStyle: {
        normal: {
          show: true,
          color: function(params: any) {
            return {
              type: "linear",
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(244, 244, 58, .5)",
                },
                {
                  offset: 1,
                  color: "rgba(81, 227, 35, 1)",
                },
              ],
            };
          },
          barBorderRadius: 70,
          borderWidth: 0,
          borderColor: "#333",
        },
      },
      barGap: "0%",
      barCategoryGap: "50%",
      data: [60, 132, 89, 134],
    },
  ],
};

export { projectBarOption };
