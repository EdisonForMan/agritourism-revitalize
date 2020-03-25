<template>
  <div class="common_chart" :id="chartId" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import echarts from "echarts";

@Component({})
export default class ArcgisCore extends Vue {
  @Prop() private option!: JSX.ChartOption;
  @Prop({ default: "E_CHARTS" }) private chartId!: string;
  @Watch("option")
  optionChange(value: JSX.ChartOption) {
    this.chart.setOption(value, true);
  }
  //    esri object <T>
  public chart: any;

  //    mounted
  mounted() {
    this.initChart();
  }

  //    initMap Promise<Boolean>
  private initChart(): void {
    this.chart = echarts.init(
      document.getElementById(this.chartId) as
        | HTMLDivElement
        | HTMLCanvasElement
    );
    this.chart.setOption(this.option, true);
  }
}
</script>

<style scoped lang="less">
.common_chart {
  flex: 1;
}
</style>