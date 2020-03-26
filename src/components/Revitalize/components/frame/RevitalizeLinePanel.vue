<template>
  <div :class="`revitalize_line ${t?`normal`:`little`}`">
    <div class="bottom">{{company}}</div>
    <header>
      {{title}}
      <span :class="`t ${t?``:`turn`}`" @click="()=>{this.t=!this.t}" />
    </header>
    <div class="container">
      <div class="text">
        <header>基本概况</header>
        <div>
          <div class="video">
            <video
              :src="sfd.videos ? sfd.videos[0] : ''"
              muted
              autoplay
              controls
              loop
            >your browser does not support the video tag</video>
            <div>项目与2020年6月建成</div>
          </div>
          <ul class="text_ul">
            <li>
              <p>项目名称</p>
              <p>{{attributes.xmname}}</p>
            </li>
            <li>
              <p>投资总额</p>
              <p>{{attributes.tz}}</p>
            </li>
            <li>
              <p>长度及范围</p>
              <p>{{attributes.cdfw}}</p>
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
              <div class="blue">{{attributes.tz2019}}</div>
              <div>
                <span>同比增长</span>
                <span>+{{attributes.tz2019zz}}</span>
              </div>
            </div>
          </div>
          <div>
            <header>产出效益-2019年</header>
            <div>
              <div class="green">{{attributes.xy2019}}</div>
              <div>
                <span>同比增长</span>
                <span>+{{attributes.xy2019zz}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="kind">
        <header>项目类别统计</header>
        <chartCore :option="option" :chartId="option.name+(+new Date())" />
      </div>-->
      <div class="project">
        <header>精品项目</header>
        <ul class="projectList">
          <li v-for="(item,index) in projectList" :key="index" @click="goProject(item)">
            <img :src="item.nowImgs[0]" />
            <div>
              <header>
                <i>{{item.projectName}}</i>
                <span class="ing">建设中</span>
              </header>
              <p>投资金额：255万元</p>
              <p>此项目位于永嘉县过路滩村，特色项目有玻璃 栈道，青少年高尔夫训练场</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChartCore from "@/components/Core/ChartCore.vue";
import { projectOption } from "./options/pie";
import { State } from "vuex-class";
import { doMassQueryBySfd } from "@/components/Revitalize/Arcgis/ArcgisProject";
@Component({
  components: { ["chartCore"]: ChartCore }
})
export default class RevitalizeLinePanel extends Vue {
  private title?: string = "山水雁楠跨区域示范带";
  private sfd?: any = {};
  private attributes?: any = {};
  private projectList: Array<any> = [];
  private company = "温州市农业农村局建设 温州设计集团技术支持";
  private t = true;
  private option = projectOption;
  @State("projectData") stateProjectData!: JSX.ScrollProject;
  mounted() {
    this.eventRegister();
  }
  private eventRegister(): void {
    const { $hub } = this as any;
    $hub.$on("sfd-on", async (dataSfd?: JSX.DataSfd) => {
      if (!dataSfd) return;
      const { sfd, attributes } = dataSfd;
      this.title = sfd.sfdName;
      this.sfd = sfd;
      this.attributes = attributes;
      this.projectList = Object.keys(this.stateProjectData)
        .map((item: string) => {
          return { ...this.stateProjectData[item], projectName: item };
        })
        .filter((item: JSX.SingleProject) => sfd.sfdName == item.sfdName);
      //  项目类型处理
      const data = await doMassQueryBySfd(this, sfd.sfdName);
      const _projectOption_ = JSON.parse(JSON.stringify(projectOption));
      const optionSeriesData = Object.keys(data.obj).map((item: string) => {
        return {
          name: item,
          count: data.obj[item],
          value: ((data.obj[item] / data.sum) * 100).toFixed(1)
        };
      });
      _projectOption_.title[1].text = `${data.sum}个`;
      _projectOption_.legend.data = Object.keys(data.obj);
      _projectOption_.series[0].data = optionSeriesData;
      (_projectOption_.legend.formatter = (name: any) => {
        return `${name}  ${
          optionSeriesData.filter(item =>
            item.name == name ? item.value : ""
          )[0].value
        }%`;
      }),
        (this.option = _projectOption_);
    });
  }
  private goProject(project: JSX.SingleProject) {
    const { $hub } = this as any;
    $hub.$emit("project-arcgis", project);
  }
}
</script>

<style scoped lang="less">
.revitalize_line {
  transition: all 0.6s;
  width: 420px;
  position: fixed;
  bottom: 70px;
  top: 0px;
  right: 40px;
  background-color: #fff;
  box-shadow: 0px 6px 15px #676767;
  border-radius: 20px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
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
  /** 建设单位 */
  .bottom {
    margin-bottom: 0px;
    position: fixed;
    bottom: 20px;
    right: 40px;
    height: 34px;
    width: 420px;
    border-radius: 17px;
    background: linear-gradient(to bottom, #3cd45b, #0b622d) !important;
    text-align: center;
    line-height: 34px;
    color: #fff;
  }
  > .container {
    overflow: hidden;
    margin-top: 8px;
    box-sizing: border-box;
    padding: 0px 12px;
    flex: 1;
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
    /** 基本概况 */
    .text {
      .video {
        width: 100%;
        height: 170px;
        overflow: hidden;
        border-radius: 12px;
        background-color: rgba(0, 0, 0, 1);
        position: relative;
        box-shadow: 0px -5px 15px 0px rgba(0, 0, 0, 0.45) inset;
        margin-bottom: 6px;
        > video {
          height: 100%;
          width: 100%;
        }
        > div {
          position: absolute;
          bottom: 0;
          left: 20px;
          right: 0px;
          line-height: 30px;
          text-align: left;
          color: #fff;
        }
      }
      .text_ul {
        list-style: none;
        li {
          text-align: left;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p:first-child {
            display: inline-block;
            padding: 0 6px;
            height: 24px;
            line-height: 26px;
            color: #000;
            background-color: rgba(26, 147, 74, 0.1);
            border-radius: 12px;
          }
          p:last-child {
            margin-top: 2px;
            color: rgba(102, 102, 102, 1);
            line-height: 24px;
          }
        }
      }
    }
    /** 投资及效益 */
    .data {
      display: block;
      border: 1pt rgba(146, 199, 149, 1) dashed;
      border-left: 0;
      border-right: 0;
      padding: 10px 0;
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
          border-right: 1pt rgba(146, 199, 149, 1) dashed;
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
              width: 110px;
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
      height: 180px;
      display: flex;
      flex-direction: column;
    }
    /** 建设项目列表 */
    .project {
      flex: 1;
      min-height: 300px;
      overflow: hidden;
      .projectList::-webkit-scrollbar {
        display: none;
      }
      .projectList {
        list-style: none;
        flex: 1;
        overflow-y: auto;
        > li {
          box-sizing: border-box;
          padding: 10px 0;
          display: flex;
          flex-direction: unset;
          font-size: 14px;
          cursor: pointer;
          > img {
            width: 160px;
            height: 100px;
            border-radius: 20px;
            overflow: hidden;
          }
          > div {
            text-align: left;
            box-sizing: border-box;
            padding-left: 10px;
            line-height: 24px;
            header {
              height: 24px;
              * {
                display: inline-block;
                font-size: 16px;
                vertical-align: top;
                height: 24px;
                font-style: normal;
              }
              span {
                margin-left: 16px;
                padding: 0 6px;
                color: rgba(26, 147, 74, 1);
                background-color: rgba(26, 147, 74, 0.1);
                border-radius: 8px;
              }
            }
            > p:last-child {
              color: rgba(153, 153, 153, 1);
            }
          }
        }
      }
    }
  }
}
.normal {
  bottom: 70px !important;
  height: unset !important;
}
.little {
  bottom: unset !important;
  height: 39px !important;
}
</style>