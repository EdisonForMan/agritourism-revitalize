const projectData = {
    legend: ["产业兴旺", "生态宜居", "美丽交通", "乡风文明","区域旅游"],
    s: [
        { name: "产业兴旺", value: 42.5 },
        { name: "生态宜居", value: 28.8 },
        { name: "美丽交通", value: 5.0 },
        { name: "乡风文明", value: 15.0 },
        { name: "区域旅游", value: 8.7 },
    ]
}
const projectOption = {
    name: "项目类型统计",
    color: ["rgb(254,230,93)", "rgb(0,244,160)", "rgb(6,178,92)", "rgb(25,80,234)", "rgb(255,185,15)", "rgb(34,139,34)"],
    tooltip: {
        trigger: 'item',
    },
    legend: {
        orient: 'vertical',
        left: 25,
        top: "center",
        textStyle: {
            color: 'rgba(0,0,0,0.5)'
        },
        formatter: (name: any) => {
            return `${name}  ${projectData.s.filter((item) => item.name == name ? item.value : '')[0].value}%`;
        },
        data: projectData.legend,
    },
    series: [
        {
            name: '项目',
            type: 'pie',
            radius: '90%',
            center: ['75%', '45%'],
            data: projectData.s,
            label: {
                show: false,
            },
        }
    ]
};
export { projectOption }
