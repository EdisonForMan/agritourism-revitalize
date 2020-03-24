<template>
  <div class="revitalize_scroll">
    <swiper ref="mySwiper">
      <swiper-slide v-for="(item,index) in FixedSfdData" :key="index">
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
@Component({})
export default class RevitalizeHeader extends Vue {
  private activeSIndex = 0; //  swiper
  private activeFIndex = 0; //  swiper-single
  private activeSfd?: JSX.ScrollSfd;
  @State("sfdData") stateSfdData!: JSX.ScrollSfd;
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
    originalArr.map((item: JSX.BottomSingle, index: number) => {
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
  private goSfd(sfdName: string, index: number, subIndex: number) {
    this.activeSIndex = index;
    this.activeFIndex = subIndex;
    const { $hub } = this as any;
    $hub.$emit("sfd-on", sfdName);
  }
}
</script>

<style scoped lang="less">
.box() {
  box-sizing: border-box;
}
.revitalize_scroll {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 1000px;
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
      > .bottomsingle {
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
</style>
