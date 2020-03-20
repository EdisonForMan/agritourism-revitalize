import echarts from 'echarts';
const riseData = {
    x: [2015, 2016, 2017, 2018, 2019, 2020],
    s: [2, 20, 14, 50, 2, 20,]
}
const riseOption = {
    name: '投资增长趋势',
    grid: {
        top: 20,
        left: 35,
        bottom: 30,
        right: 20
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(50,205,50,0.6)',
                type: 'dashed'
            }
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: 'rgba(50,205,50,0.6)',
            }
        },
        axisLabel: { color: 'rgba(0,0,0,0.5)' },
        data: riseData.x
    },
    yAxis: {
        type: 'value',
        splitLine: {    
            show: true,
            lineStyle: {
                color: 'rgba(50,205,50,0.6)',
                type: 'dashed'
            }
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: 'rgba(50,205,50,0.6)',
            }
        },
        axisLabel: { color: 'rgba(0,0,0,0.5)' },
    },
    series: [
        {
            name: '最高水量',
            type: 'line',
            //  smooth: true,
            //  symbol: "none", //去掉折线点
            itemStyle: {
                normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(255,215,0,0.8)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(255,215,0,0)' // 100% 处的颜色
                    }]), //背景渐变色
                    // lineStyle: { // 系列级个性化折线样式
                    //     width: 0.5,
                    //     type: 'solid',
                    //     color: "rgba(60,179,113,1)"
                    // }
                },
            }, //线条样式
            symbolSize: 5, //折线点的大小
            areaStyle: {
                normal: {}
            },
            data: riseData.s
        }]
};
export { riseOption }
