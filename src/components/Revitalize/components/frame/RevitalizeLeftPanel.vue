<template>
  <div :class="`revitalize_left ${t?`normal`:`little`}`">
    <header>
      {{ title1 }}
      <span :class="`t ${t?``:`turn`}`" @click="()=>{this.t=!this.t}" />
    </header>
    <div class="container" :style="{ flex: 1 }">
      <div class="build">
        <header>建设情况</header>
        <div>
          <ul>
            <li v-for="(item, index) in options.overview" :key="index">
              <div :style="{backgroundColor:item.c,color:item.f}">
                <div :style="{borderRight:`1px ${item.f} dashed`}">
                  <i>{{item.count}}</i>
                  <i>{{item.unit}}</i>
                </div>
                <div>
                  <span>{{item.time}}</span>
                  <span>{{item.text}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="data">
        <header>投资及效益</header>
        <div>
          <div>
            <header>实现投资-2019年</header>
            <div>
              <div class="blue">70.63亿</div>
              <div>
                <span>同比增长</span>
                <span>+46.09%</span>
              </div>
            </div>
          </div>
          <div>
            <header>产出效益-2019年</header>
            <div>
              <div class="green">- 万</div>
              <div>
                <span>同比增长</span>
                <span>- %</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="kind">
        <header>项目类型占比</header>
        <chartCore :option="options['project']" :chartId="options['project'].name + +new Date()" />
      </div>
    </div>
    <header>{{ title2 }}</header>
    <div class="container">
      <!-- <div class="user">
        <header>用户总量</header>
        <div>
          <div>25,489人</div>
          <div>
            <span>男性40%</span>
            <span>女性60%</span>
          </div>
        </div>
      </div>-->
      <div class="preference">
        <header>农旅喜好占比</header>
        <ul class="list">
          <li v-for="(item,index) in data" :key="index">
            <span>{{item.name}}</span>
            <span>{{item.count}}个</span>
            <span>{{item.value}}%</span>
          </li>
        </ul>
        <chartCore
          :option="options['preference']"
          :chartId="options['preference'].name + +new Date()"
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
import { radarOption, radarData } from "./options/radar";
//  option interface
interface OptionHash {
  [elem: string]:
    | echarts.EChartOption
    | echarts.EChartsResponsiveOption
    | object[];
}
@Component({
  components: { ["chartCore"]: ChartCore }
})
export default class RevitalizeLeftPanel extends Vue {
  private title1 = "乡村振兴示范带总览";
  private title2 = "农旅融合平台用户分析";
  private t = true;
  public options: OptionHash = {};
  public data: Array<object> = radarData;
  created() {
    this.options["overview"] = overviewList;
    this.options["rise"] = this.doOption(riseOption);
    this.options["project"] = this.doOption(projectOption);
    this.options["preference"] = this.doOption(radarOption);
  }
  public doOption(riseOption: any): echarts.EChartOption {
    return riseOption;
  }
  mounted() {
    this.eventRegister();
  }
  private eventRegister(): void {
    const { $hub } = this as any;
    $hub.$on("sfd-on", (sfd: JSX.DataSfd) => {
      !sfd.sfd.shallLine && (this.t = false);
    });
    $hub.$on("project-on", () => {
      this.t = false;
    });
    $hub.$on("back-sfd", () => {
      this.t = true;
    });
  }
}
</script>

<style scoped lang="less">
.revitalize_left {
  transition: all 0.6s;
  width: 420px;
  position: fixed;
  top: 120px;
  left: 40px;
  background-color: #fff;
  box-shadow: 0px 6px 15px #676767;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  > header {
    position: relative;
    background-image: url(../../imgs/title.png);
    background-repeat: no-repeat;
    font-size: 20px;
    font-weight: bold;
    line-height: 40px;
    text-align: left;
    height: 40px !important;
    box-sizing: border-box;
    padding-left: 12px;
    color: #fff;
    > .t {
      display: block;
      position: absolute;
      top: 10px;
      right: 20px;
      height: 20px;
      width: 20px;
      background: url(../../imgs/garrow.png);
      background-size: 100% 100%;
      cursor: pointer;
      transition: all 0.5s;
    }
    > .turn {
      transform: rotate(180deg);
    }
  }
  > .container {
    margin-top: 8px;
    box-sizing: border-box;
    padding: 0px 12px;
    display: flex;
    flex-direction: column;
    > div {
      display: flex;
      flex-direction: column;
      height: auto;
      margin-bottom: 6px;
      margin-top: 2px;
      text-align: left;
      > header:before {
        content: "";
        width: 20px;
        height: 12px;
        display: block;
        position: absolute;
        right: -22px;
        top: 2px;
        background-image: url(../../imgs/leaf.png);
        background-size: cover;
      }
      > header {
        display: inline-block;
        font-size: 18px;
        font-weight: bold;
        text-align: left;
        line-height: 30px;
        height: 30px;
        color: rgba(26, 147, 74, 1);
        position: relative;
        width: max-content;
      }
    }
    /** 建设情况 */
    .build {
      > div {
        > ul {
          text-align: left;
          > li:nth-child(1),
          > li:nth-child(3) {
            padding-right: 6px;
          }
          > li:nth-child(2),
          > li:nth-child(4) {
            padding-left: 6px;
          }
          > li {
            display: inline-block;
            width: 50%;
            box-sizing: border-box;
            padding: 4px 0;
            > div {
              height: 50px;
              width: 100%;
              display: flex;
              box-sizing: border-box;
              padding: 4px 6px;
              border-radius: 8px;
              > div:first-child {
                width: 80px;
                text-align: center;
                border-right: 1px #ddd dashed;
                > i {
                  font-style: normal;
                  font-weight: bold;
                  display: inline-block;
                  line-height: 46px;
                }
                > i:first-child {
                  font-size: 30px;
                }
                > i:last-child {
                  font-size: 12px;
                }
              }
              > div:last-child {
                box-sizing: border-box;
                padding-left: 8px;
                width: 110px;
                > span {
                  display: block;
                  line-height: 22px;
                }
              }
            }
          }
        }
      }
    }
    /** 建设情况 */
    .data {
      display: block;
      padding: 12px 0;
      > div {
        > div:last-child {
          border-right: 0;
          padding-left: 16px;
        }
        > div {
          vertical-align: top;
          text-align: left;
          display: inline-block;
          width: 50%;
          box-sizing: border-box;
          header {
            font-size: 18px;
            height: 36px;
            line-height: 36px;
            font-weight: bold;
          }
          > div {
            > div {
              display: inline-block;
              text-align: left;
              height: 40px;
              line-height: 40px;
              vertical-align: top;
            }
            .blue {
              color: rgba(37, 151, 248, 1);
            }
            .green {
              color: rgba(248, 118, 37, 1);
            }
            > div:first-child {
              width: 100px;
              font-size: 24px;
              font-family: Tahoma;
            }
            > div:last-child {
              width: 60px;
              line-height: unset;
              box-sizing: border-box;
              > span {
                display: inline-block;
                width: 100%;
                height: 20px;
                line-height: 20px;
                font-size: 12px;
              }
              > span:first-child {
                color: rgba(153, 153, 153, 1);
              }
              > span:last-child {
                color: rgba(17, 17, 17, 1);
              }
            }
          }
        }
      }
    }
    /** 项目类型占比 */
    .kind {
      height: 240px;
      display: flex;
      flex-direction: column;
    }
    /** 用户总量 */
    .user {
      height: 80px;
      border-bottom: 1pt rgba(146, 199, 149, 1) dashed;
      > div {
        display: flex;
        > div {
          height: 40px;
          line-height: 40px;
        }
        > div:first-child {
          width: 120px;
          font-size: 20px;
          color: rgba(26, 147, 74, 1);
          font-weight: bold;
        }
        > div:last-child {
          width: 276px;
          box-sizing: border-box;
          padding: 0 13px;
          position: relative;
          padding: 5px;
          span {
            position: absolute;
            height: 30px;
            line-height: 30px;
            border-radius: 15px;
            background-color: rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            color: rgba(255, 255, 255, 1);
          }
          span:first-child {
            width: 100%;
            left: 0;
            z-index: 3;
            padding-left: 10px;
            background-color: rgba(37, 151, 248, 1);
          }
          span:last-child {
            width: 60%;
            right: 0;
            z-index: 4;
            padding-right: 10px;
            text-align: right;
            box-shadow: -2px 0px 4px 0px rgba(0, 0, 0, 0.6);
            background-color: rgba(248, 173, 37, 1);
          }
        }
      }
    }
    /** 农旅喜好占比 */
    .preference {
      height: 240px;
      position: relative;
      .list {
        position: absolute;
        top: 50px;
        left: 4px;
        list-style: none;
        > li {
          height: 30px;
          line-height: 30px;
          > span {
            font-family: Helvetica Neue;
            color: #666666;
            font-size: 12px;
            margin-right: 10px;
          }
          > span:last-child {
            color: #1a934a;
          }
        }
      }
    }
  }
}
.normal {
  bottom: 26px !important;
  height: unset !important;
}
.little {
  bottom: unset !important;
  height: 39px !important;
}
</style>
