const projectData = {
    legend: ["产业兴旺", "生态宜居", "治理有效", "乡风文明"],
    s: [
        { name: "产业兴旺", value: 42.59 },
        { name: "生态宜居", value: 5.78 },
        { name: "治理有效", value: 13.13 },
        { name: "乡风文明", value: 48.24 },
    ]
}
const projectOption = {
    name: "项目类型统计",
    color: ["rgb(254,230,93)", "rgb(0,244,160)", "rgb(6,178,92)", "rgb(25,80,234)"],
    tooltip: {
        trigger: 'item',
    },
    legend: {
        orient: 'vertical',
        left: 20,
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
            center: ['70%', '45%'],
            data: projectData.s,
            label: {
                show: false,
            },
        }
    ]
};
export { projectOption }
