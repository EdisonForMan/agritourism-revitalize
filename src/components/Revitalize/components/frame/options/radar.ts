const ratioData = [
  { value: 24.0, name: "亲子", count: 17192 },
  { value: 12.5, name: "农耕", count: 8973 },
  { value: 17.1, name: "节气", count: 12294 },
  { value: 16.0, name: "观赏", count: 11500 },
  { value: 30.4, name: "网红", count: 21778 }
];
const indicator: Array<any> = [];
const showData: Array<any> = [];
ratioData.map(item => {
  indicator.push({ name: item.name, max: 35 });
  showData.push(Number(item.value));
});

export const radarOption = {
  name: "喜好分析",
  grid: {
    top: 20,
    left: 35,
    bottom: 35,
    right: 20
  },
  tooltip: {},
  radar: {
    right: "center",
    indicator,
    radius: "70%",
    center: ["70%", "55%"],
    splitNumber: 5,
    splitLine: {
      show: true,
      lineStyle: {
        opacity: 1,
      }
    },
    axisLine: {
      lineStyle: {
      }
    }
  },
  series: [
    {
      name: "喜好分析",
      type: "radar",
      symbolSize: 0.1,
      areaStyle: {
        normal: {
          opacity: 0.6,
          color: "rgba(0,115,247,1)"
        }
      },
      lineStyle: {
        width: 0
      },
      data: [showData]
    }
  ]
};
