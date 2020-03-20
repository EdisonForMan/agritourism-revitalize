<template>
  <div class="revitalize_left">
    <div>
      <header>
        <i>示范带总览</i>
        <i>/ THE OVERVIEW</i>
      </header>
      <ul>
        <li v-for="(item,index) in options.overview" :key="index">- {{item}}</li>
      </ul>
    </div>
    <div>
      <header>
        <i>投资增长趋势</i>
        <i>/ GROWTH TREND</i>
      </header>
      <chartCore :option="options['rise']" :chartId="options['rise'].name+(+new Date())" />
    </div>
    <div>
      <header>
        <i>项目类型统计</i>
        <i>/ TYPES OF STANTISTICAL</i>
      </header>
      <chartCore :option="options['project']" :chartId="options['project'].name+(+new Date())" />
    </div>
    <div>
      <header>
        <i>喜好分析-用户</i>
        <i>/ PREFERENCES</i>
      </header>
      <chartCore :option="options['preference']" :chartId="options['preference'].name+(+new Date())" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChartCore from "@/components/Core/ChartCore.vue";
import { overviewList } from "./options/overview";
import { riseOption } from "./options/line";
import { projectOption } from "./options/pie";
import { radarOption } from "./options/radar";
//  option interface
interface OptionHash {
  [elem: string]:
    | echarts.EChartOption
    | echarts.EChartsResponsiveOption
    | string[];
}
@Component({
  components: { ["chartCore"]: ChartCore }
})
export default class RevitalizeLeftPanel extends Vue {
  public options: OptionHash = {};
  created() {
    this.options["overview"] = overviewList;
    this.options["rise"] = this.doOption(riseOption, {});
    this.options["project"] = this.doOption(projectOption, {});
    this.options["preference"] = this.doOption(radarOption, {});
  }
  public doOption(riseOption: any, data?: object): echarts.EChartOption {
    return riseOption;
  }
}
</script>

<style scoped lang="less">
.revitalize_left {
  width: 380px;
  position: fixed;
  bottom: 80px;
  top: 100px;
  left: 20px;
  > div {
    position: relative;
    height: 25%;
    box-sizing: border-box;
    overflow: hidden;
    margin: 10px 0;
    border-radius: 40px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0px 6px 15px #676767;
    padding: 0 10px;
    > header {
      line-height: 50px;
      text-align: left;
      height: 50px !important;
      box-sizing: border-box;
      padding-left: 10px;
      i {
        font-style: normal;
      }
      i:first-child {
        font-size: 20px;
        font-weight: bold;
        color: #000;
      }
      i:last-child {
        margin-left: 6px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.3);
      }
    }
    > div {
      flex: 1;
    }
    > ul {
      text-align: left;
      flex: 1;
      box-sizing: border-box;
      padding: 10px 0;
      > li {
        height: 20%;
        color: rgba(0, 0, 0, 0.7);
        cursor: pointer;
      }
    }
  }
}
</style>
