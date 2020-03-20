<template>
  <div class="common_chart" :id="chartId" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import echarts from "echarts";

@Component({})
export default class ArcgisCore extends Vue {
  @Prop() private option!: JSX.ChartOption;
  @Prop({ default: "E_CHARTS" }) private chartId!: string;
  //    esri object <T>
  public chart: any;
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
    this.chart.setOption(this.option);
  }
}
</script>