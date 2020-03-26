<template>
  <div class="revitalize_project">
    <div class="bottom">{{company}}</div>
    <div class="flower" />
    <header>
      {{title}}
      <span class="back" @click="goBack" />
    </header>
    <div class="container">
      <div class="text">
        <header>基本概况</header>
        <div>
          <div class="video">
            <video
              v-if="project.videos && project.videos.length"
              :src="project.videos ? project.videos[0] : ''"
              autoplay
              controls
              loop
            >your browser does not support the video tag</video>
            <div>项目与2020年6月建成</div>
          </div>
          <ul class="text_ul">
            <li>
              <p>项目名称</p>
              <p
                v-if="(attributes.VR && attributes.VR != 'Null') || (attributes.全景 && attributes.全景 != 'Null')"
                class="goVr"
                @click="goVr"
              >查看全景</p>
              <p>{{attributes.NAME_1 || attributes.名称}}</p>
            </li>
            <!-- <li>
              <p>投资总额</p>
              <p>该项目计划投资1.2亿元，已完成投资3500万元</p>
            </li>-->
            <li>
              <p>长度及范围</p>
              <p>{{attributes.SUMMARY_1 || attributes.简介}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="imgs">
        <header>项目风采</header>
        <div v-if="doSwiper">
          <div class="imgs-button-prev" slot="button-prev"></div>
          <swiper :options="sOption('imgs')" ref="imgsSwiper">
            <swiper-slide v-for="(item,index) in FixedImgsData" :key="index">
              <ul :class="`swiper_ul swiper_ul_${index}`">
                <li v-for="(subItem,subIndex) in item" :key="subIndex">
                  <div :style="{backgroundImage:`url(${subItem})`}" />
                </li>
              </ul>
            </swiper-slide>
          </swiper>
          <div class="imgs-button-next" slot="button-next"></div>
        </div>
      </div>
      <!-- <div class="future">
        <header>未来蓝图</header>
        <div>
          <div class="future-button-prev" slot="button-prev"></div>
          <swiper :options="sOption('future')" ref="futureSwiper">
            <swiper-slide v-for="(item,index) in FixedFutureData" :key="index">
              <ul :class="`swiper_ul swiper_ul_${index}`">
                <li
                  v-for="({sfdName,img},subIndex) in item"
                  :key="subIndex"
                  @click="goSfd(sfdName,index,subIndex)"
                >
                  <div
                    :class="[index == activeSIndex && subIndex == activeFIndex?`active`:``,`SingleSfd`]"
                    :style="{backgroundImage:`url(${img})`}"
                  >
                    <div class="label">{{sfdName}}</div>
                  </div>
                </li>
              </ul>
            </swiper-slide>
          </swiper>
          <div class="future-button-next" slot="button-next"></div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChartCore from "@/components/Core/ChartCore.vue";
import { SwiperOptions, NavigationOptions } from "swiper";

@Component({
  components: { ["chartCore"]: ChartCore }
})
export default class RevitalizeProjectPanel extends Vue {
  private title?: string = "永嘉县雁楠逸园";
  private project?: any = {};
  private attributes?: any = {};
  private company = "温州市农业农村局建设 温州设计集团技术支持";
  private FixedImgsData: Array<any> = [];
  private FixedFutureData: Array<any> = [];
  private doSwiper = false;
  private jumpImg = require("@/components/Revitalize/imgs/jump.jpg");
  private swiperOption: SwiperOptions = {
    autoplay: { delay: 8000 },
    loop: true,
    navigation: {
      nextEl: ".future-button-next",
      prevEl: ".future-button-prev"
    }
    // direction: "vertical"
  };
  mounted() {
    this.eventRegister();
  }
  private eventRegister(): void {
    const { $hub } = this as any;
    $hub.$on("project-on", (dataProject?: JSX.DataProject) => {
      if (!dataProject) return;
      const { project, attributes } = dataProject;
      this.title = project.projectName;
      this.project = project;
      this.attributes = attributes;
      this.FixedImgsData = this.FixedProjectImg(project.nowImgs);
      this.$nextTick(() => {
        this.doSwiper = true;
      });
    });
  }
  private FixedProjectImg(nowImgs: Array<any>): Array<any> {
    const arr: Array<any> = [];
    nowImgs.map((item: string, index: number) => {
      const arrIndex = Math.floor(index / 6);
      !arr[arrIndex] && (arr[arrIndex] = []);
      arr[arrIndex].push(item);
    });
    return arr;
  }
  private sOption(el: string): SwiperOptions {
    const navigation: NavigationOptions = {
      nextEl: `.${el}-button-next`,
      prevEl: `.${el}-button-prev`
    };
    return {
      ...JSON.parse(JSON.stringify((this as any).swiperOption)),
      navigation
    };
  }
  private goBack() {
    (this as any).$hub.$emit("back-sfd", {});
  }
  private goVr() {
    (this as any).$window.open(this.attributes.VR || this.attributes.全景);
  }
}
</script>

<style scoped lang="less">
.revitalize_project {
  width: 420px;
  position: fixed;
  bottom: 70px;
  top: 0px;
  right: 40px;
  background-color: #fff;
  box-shadow: 0px 6px 15px #676767;
  border-radius: 20px;
  margin-top: 80px;
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
    .back {
      position: absolute;
      top: 10px;
      right: 20px;
      height: 26px;
      width: 60px;
      background-color: rgba(0, 0, 0, 0.5);
      background: url(../../imgs/back.png);
      background-size: 100% 100%;
      border-radius: 4px;
      cursor: pointer;
    }
  }
  .flower {
    position: fixed;
    background-image: url(../../imgs/flower.png);
    background-size: cover;
    height: 300px;
    width: 300px;
    right: 0;
    top: -140px;
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
      > div {
        flex: 1;
      }
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
        border-radius: 12px;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 1);
        position: relative;
        box-shadow: 0px -5px 15px 0px rgba(0, 0, 0, 0.45) inset;
        margin-bottom: 6px;
        > video {
          height: 170px;
          width: 100%;
        }
        > img {
          display: block;
          height: 170px;
          width: 100%;
          cursor: pointer;
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
          // p {
          //   overflow: hidden;
          //   text-overflow: ellipsis;
          //   white-space: nowrap;
          // }
          p:first-child {
            display: inline-block;
            padding: 0 6px;
            height: 24px;
            line-height: 26px;
            color: #000;
            background-color: rgba(26, 147, 74, 0.1);
            border-radius: 12px;
          }
          > .goVr {
            display: inline-block;
            margin-left: 20px;
            padding: 0 6px;
            height: 24px;
            line-height: 26px;
            color: #fff;
            background-color: rgba(27, 148, 75, 0.521);
            border-radius: 12px;
            cursor: pointer;
          }
          p:last-child {
            margin-top: 2px;
            color: rgba(102, 102, 102, 1);
            line-height: 24px;
          }
        }
      }
    }
    /** 项目风采 */
    .imgs {
      flex: 1;
      overflow: hidden;
    }
    /** 未来蓝图 */
    .future {
      flex: 1;
    }
  }
  /** 公用swiper */
  .swiper-container {
    height: 100%;
  }
  .swiper_ul {
    height: 100%;
    text-align: left;
    li {
      display: inline-block;
      width: 100%/2;
      height: 100%/3;
      vertical-align: top;
      box-sizing: border-box;
      padding: 0 10px 20px 10px;
      > div {
        position: relative;
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.5);
        box-sizing: border-box;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
        background-color: rgba(255, 255, 255, 0.6);
        background-size: 100% 100%;
      }
    }
  }
  //  前进后退样式
  .swiper-button-prev,
  .swiper-button-next {
    background-image: url(../../imgs/arrow.png);
    background-size: 100% 100%;
    width: 40px;
    height: 40px;
    display: inline-block;
  }
  .swiper-button-next {
    transform: rotate(180deg);
  }
  .swiper-button-prev:after,
  .swiper-button-next:after {
    content: "";
  }
}
</style>