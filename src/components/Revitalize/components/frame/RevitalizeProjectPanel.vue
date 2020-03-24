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
            <video />
            <div>项目与2020年6月建成</div>
          </div>
          <ul class="text_ul">
            <li>
              <p>项目名称</p>
              <p>山水雁楠跨区域示范带</p>
            </li>
            <li>
              <p>投资总额</p>
              <p>该项目计划投资1.2亿元，已完成投资3500万元</p>
            </li>
            <li>
              <p>长度及范围</p>
              <p>17.2km，覆盖15个村，南起岩头镇，北至巨坑村，东到上美村。</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="imgs">
        <header>项目风采</header>
        <div>
          <swiper ref="imgsSwiper">
            <swiper-slide v-for="(item,index) in FixedImgsData" :key="index">
              <ul :class="`swiper_ul swiper_ul_${index}`">
                <li
                  v-for="({sfdName,img},subIndex) in item"
                  :key="subIndex"
                  @click="goSfd(sfdName,index,subIndex)"
                >
                  <div
                    :class="[index == activeSIndex && subIndex == activeFIndex?`active`:``,`bottomsingle`]"
                    :style="{backgroundImage:`url(${img})`}"
                  >
                    <div class="label">{{sfdName}}</div>
                  </div>
                </li>
              </ul>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="future">
        <header>未来蓝图</header>
        <div>
          <swiper ref="futureSwiper">
            <swiper-slide v-for="(item,index) in FixedFutureData" :key="index">
              <ul :class="`swiper_ul swiper_ul_${index}`">
                <li
                  v-for="({sfdName,img},subIndex) in item"
                  :key="subIndex"
                  @click="goSfd(sfdName,index,subIndex)"
                >
                  <div
                    :class="[index == activeSIndex && subIndex == activeFIndex?`active`:``,`bottomsingle`]"
                    :style="{backgroundImage:`url(${img})`}"
                  >
                    <div class="label">{{sfdName}}</div>
                  </div>
                </li>
              </ul>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChartCore from "@/components/Core/ChartCore.vue";

@Component({
  components: { ["chartCore"]: ChartCore }
})
export default class RevitalizeProjectPanel extends Vue {
  private title = "永嘉县雁楠逸园";
  private company = "温州市农业农村局 建设 温州市设计集团 技术支持";
  private FixedImgsData: Array<any> = [];
  private FixedFutureData: Array<any> = [];
  private goBack() {
    (this as any).$hub.$emit("sfd-on", {});
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
      top: 8px;
      right: 20px;
      height: 24px;
      width: 50px;
      background-color: rgba(0, 0, 0, 0.5);
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
        height: 120px;
        border-radius: 12px;
        background-color: rgba(0, 0, 0, 0.1);
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
    /** 项目风采 */
    .imgs {
      flex: 1;
    }
    /** 未来蓝图 */
    .future {
      flex: 1;
    }
  }
}
</style>