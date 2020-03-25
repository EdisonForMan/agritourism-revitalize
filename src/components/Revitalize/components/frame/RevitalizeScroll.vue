<template>
  <div class="revitalize_scroll">
    <div class="swiper-button-prev" slot="button-prev"></div>
    <swiper :options="swiperOption" ref="swiper">
      <swiper-slide v-for="(item,index) in FixedSfdData" :key="index">
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
    <div class="swiper-button-next" slot="button-next"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import { SwiperOptions } from "swiper";
@Component({})
export default class RevitalizeHeader extends Vue {
  private activeSIndex = 0; //  swiper
  private activeFIndex = 0; //  swiper-single
  private activeSfd?: JSX.ScrollSfd;
  private swiperOption: SwiperOptions = {
    // autoplay: { delay: 30000 },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    direction: "horizontal"
  };
  @State("sfdData") stateSfdData!: JSX.ScrollSfd;
  @State("arcgisDone") stateArcgisDone!: boolean;
  @Watch("stateArcgisDone")
  async arcgisDoneChange(value: boolean) {
    const arr = this.FixedSfdData;
    if (value) {
      //  默认[山水雁楠精品带]
      setTimeout(() => {
        this.goSfd(arr[0][0].sfdName, 0, 0, true);
      }, 1);
    }
  }
  get FixedSfdData(): Array<JSX.ScrollSfd> {
    const arr: Array<any> = [];
    const originalArr: Array<any> = Object.keys(this.stateSfdData).map(
      (item: string) => {
        return {
          sfdName: item,
          img: this.stateSfdData[item].imgs[0]
        };
      }
    );
    originalArr.map((item: JSX.SingleSfd, index: number) => {
      const arrIndex = Math.floor(index / 6);
      !arr[arrIndex] && (arr[arrIndex] = []);
      arr[arrIndex].push(item);
    });
    return arr;
  }
  //  created
  created() {
    this.activeSfd = this.FixedSfdData[
      this.activeSIndex * 6 + this.activeFIndex
    ];
  }
  private goSfd(
    sfdName: string,
    index: number,
    subIndex: number,
    shallLine = false
  ) {
    if (index || subIndex) return;
    this.activeSIndex = index;
    this.activeFIndex = subIndex;
    //  $hub emit
    const { $hub } = this as any;
    $hub.$emit("sfd-arcgis", {
      ...this.stateSfdData[sfdName],
      sfdName,
      shallLine
    });
  }
}
</script>

<style scoped lang="less">
.box() {
  box-sizing: border-box;
}
.revitalize_scroll {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 1100px;
  * {
    vertical-align: middle;
  }
  .swiper-container {
    position: relative;
    width: 1000px;
    /** 轮播内容 */
    .swiper_ul {
      text-align: center;
      li {
        display: inline-block;
        width: 100%/6;
        height: 110px;
        vertical-align: top;
        .box();
        padding: 0 10px 20px 10px;
        .active {
          border: 2px rgb(81, 245, 185) solid;
          .label {
            border-radius: 14px 0 0 0;
            background: linear-gradient(to bottom, #3cd45b, #0b622d) !important;
          }
        }
        > .SingleSfd {
          position: relative;
          box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.5);
          .box();
          height: 100%;
          border-radius: 10px;
          overflow: hidden;
          background-color: rgba(255, 255, 255, 0.6);
          background-size: 100% 100%;
          cursor: pointer;
          .label {
            position: absolute;
            bottom: 0px;
            width: 100%;
            height: 28px;
            line-height: 28px;
            padding: 0 14px;
            text-align: center;
            font-size: 16px;
            color: #fff;
            box-sizing: border-box;
            white-space: normal;
            overflow: hidden;
            background-color: rgba(0, 0, 0, 0.4);
          }
        }
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
