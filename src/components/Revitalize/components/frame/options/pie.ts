const s = [
    { name: "产业兴旺", count: 301 },
    { name: "治理有效", count: 57 },
    { name: "生态宜居", count: 320 },
    { name: "生活富裕", count: 18 },
    { name: "乡风文明", count: 76 },
    { name: "环境优美", count: 6 },
    { name: "农村改革", count: 16 },
]
const sum = 794;
const projectData = {
    legend: ["产业兴旺", "治理有效", "生态宜居", "生活富裕", "乡风文明", "环境优美", "农村改革"],
    s: s.map((item: any) => {
        return { ...item, value: ((item.count / sum) * 100).toFixed(1) }
    })
}
const projectOption = {
    name: "项目类型统计",
    color: ["rgb(254,230,93)", "rgb(0,244,160)", "rgb(6,178,92)", "rgb(25,80,234)", "rgb(255,185,15)", "rgb(34,139,34)"],
    tooltip: {
        trigger: 'item',
    },
    title: [{
        text: "建成项目总数",
        textStyle: {
            color: 'rgba(0,0,0,0.6)',
            fontWeight: 'normal',
            fontSize: 15
        },
        top: '36%',
        right: '18%'
    }, {
        text: `${sum}个`,
        textStyle: {
            color: 'rgba(4, 146, 41, 1)',
            fontWeight: 'bold',
            fontSize: 20
        },
        top: '50%',
        right: '21%'
    }],
    grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    legend: {
        orient: 'vertical',
        left: 25,
        top: "center",
        textStyle: {
            fontSize: 14,
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
            radius: ['55%', '75%'],
            center: ['70%', '50%'],
            avoidLabelOverlap: false,
            data: projectData.s,
            label: {
                show: false,
                position: "center"
            },
        }
    ]
};
export { projectOption }
