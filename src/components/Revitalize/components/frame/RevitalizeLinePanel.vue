<template>
  <div class="revitalize_line">
    <div class="top">{{company}}</div>
    <header>{{title}}</header>
    <div class="data">
      <div>
        <header>投入建设金额</header>
        <div>
          <div class="blue">8881万</div>
          <div>
            <span>同比增长</span>
            <span>+18.26%</span>
          </div>
        </div>
      </div>
      <div>
        <header>投入建设金额</header>
        <div>
          <div class="green">8881万</div>
          <div>
            <span>同比增长</span>
            <span>+18.26%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="video"></div>
    <div class="text">
      <header>示范带简介</header>
    </div>
    <div class="kind">
      <header>项目类别统计(个)</header>
      <chartCore :option="option" :chartId="option.name+(+new Date())" />
    </div>
    <div class="project">
      <header>精品项目</header>
      <ul class="projectList">
        <li>
          <span>项目名称</span>
          <span>建设状态</span>
          <span>县区</span>
          <span>投资金额</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ChartCore from "@/components/Core/ChartCore.vue";
import { projectBarOption } from "./options/bar";

@Component({
  components: { ["chartCore"]: ChartCore }
})
export default class RevitalizeLinePanel extends Vue {
  private title = "山水雁楠跨区域示范带";
  private company = "温州市农业农村局主办 温州市设计集团技术支持";
  private option = projectBarOption;
}
</script>

<style scoped lang="less">
.revitalize_line {
  width: 420px;
  position: fixed;
  bottom: 40px;
  top: 0px;
  right: 40px;
  background-color: #fff;
  box-shadow: 0px 6px 15px #676767;
  border-radius: 40px;
  box-sizing: border-box;
  margin-top: 60px;
  padding: 10px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    flex-direction: column;
    height: auto;
    margin-bottom: 10px;
    > div {
      flex: 1;
    }
    > header {
      font-size: 18px;
      font-weight: bold;
      text-align: left;
    }
  }
  > header {
    font-size: 20px;
    font-weight: bold;
    line-height: 50px;
    text-align: left;
    color: #000;
    height: 50px !important;
    box-sizing: border-box;
  }
  .top {
    margin-bottom: 0px;
    position: fixed;
    top: 0;
    right: 40px;
    height: 30px;
    width: 420px;
    border-radius: 0 0 30px 30px;
    background: #0073f8;
    text-align: center;
    line-height: 30px;
    color: #fff;
  }
  .data {
    display: block;
    > div {
      vertical-align: top;
      text-align: left;
      display: inline-block;
      width: 50%;
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
          height: 60px;
          line-height: 60px;
          vertical-align: top;
        }
        .blue {
          color: rgba(8, 117, 244, 1);
        }
        .green {
          color: rgba(22, 217, 120, 1);
        }
        > div:first-child {
          width: 110px;
          font-size: 26px;
          font-family: Tahoma;
        }
        > div:last-child {
          width: 85px;
          line-height: unset;
          box-sizing: border-box;
          padding-top: 10px;
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
  .video {
  }
  .text {
  }
  .kind {
    height: 200px;
  }
  .project {
    .projectList {
      list-style: none;
      margin-top: 10px;
      > li:first-child {
        background-color: rgba(248, 248, 248, 1);
        > span {
          color: rgba(102, 102, 102, 1) !important;
        }
      }
      > li {
        box-sizing: border-box;
        padding: 0 10px;
        color: rgba(51, 51, 51, 1);
        height: 30px;
        line-height: 30px;
        text-align: left;
        > span {
          display: inline-block;
          vertical-align: top;
        }
        > span {
          width: 75px;
          text-align: center;
        }
        > span:first-child {
          width: 125px;
          text-align: left;
        }
        > span:nth-child(2),
        span:nth-child(3) {
          color: rgba(193, 193, 193, 1);
        }
      }
    }
  }
}
</style>