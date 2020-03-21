<template>
  <div class="revitalize_left">
    <div>
      <div>
        <header>
          <i>示范带总览</i>
        </header>
        <ul>
          <li v-for="(item,index) in options.overview" :key="index">- {{item}}</li>
        </ul>
      </div>
    </div>
    <div>
      <div>
        <header>
          <i>平台用户增长趋势(人)</i>
        </header>
        <chartCore :option="options['rise']" :chartId="options['rise'].name+(+new Date())" />
      </div>
    </div>
    <div>
      <div>
        <header>
          <i>项目类型统计</i>
        </header>
        <chartCore :option="options['project']" :chartId="options['project'].name+(+new Date())" />
      </div>
    </div>
    <div>
      <div>
        <header>
          <i>喜好分析-用户</i>
        </header>
        <chartCore
          :option="options['preference']"
          :chartId="options['preference'].name+(+new Date())"
        />
      </div>
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
  bottom: 40px;
  top: 88px;
  left: 40px;

  > div {
    position: relative;
    height: 25%;
    box-sizing: border-box;
    padding-top: 30px;
    > div::before {
      content: "";
      position: absolute;
      display: block;
      bottom: 0;
      left: -24px;
      width: 50px;
      height: 110%;
      background: url(../../imgs/border.png);
      background-size: 100% 100%;
    }
    > div {
      position: relative;
      border-radius: 20px;
      background-color: #fff;
      box-shadow: 0px 6px 15px #676767;
      padding: 0 10px 0 20px;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      > header {
        line-height: 46px;
        text-align: left;
        height: 40px !important;
        box-sizing: border-box;
        padding-left: 14px;
        i {
          font-style: normal;
        }
        i:first-child {
          font-size: 20px;
          font-weight: bold;
          color: #000;
        }
      }
      > div {
        flex: 1;
      }
      > ul {
        text-align: left;
        flex: 1;
        box-sizing: border-box;
        padding: 0px 0 10px 2px;
        list-style: none;
        > li {
          height: 20%;
          color: rgba(0, 0, 0, 0.7);
          cursor: pointer;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
