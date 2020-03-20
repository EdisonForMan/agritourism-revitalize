const ratioData = [
  { value: 33.21, name: "亲子" },
  { value: 21.72, name: "农耕" },
  { value: 18.21, name: "节气" },
  { value: 16.51, name: "观赏" },
  { value: 10.21, name: "网红" }
];
const indicator: any[] = [];
const showData: any[] = [];
ratioData.map(item => {
  indicator.push({ name: item.name, max: 35 });
  showData.push(Number(item.value));
});

export const radarOption = {
  name: "喜好分析",
  grid: {
    top: 20,
    left: 35,
    bottom: 30,
    right: 20
  },
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
        color: "rgba(60,179,113,1)"
      }
    },
    axisLine: {
      lineStyle: {
        color: "rgba(60,179,113,1)"
      }
    }
  },
  series: [
    {
      type: "radar",
      symbolSize: 0.1,
      areaStyle: {
        normal: {
          opacity: 0.6,
          color: "rgba(50,205,50,1)"
        }
      },
      lineStyle: {
        width: 0
      },
      data: [showData]
    }
  ]
};
