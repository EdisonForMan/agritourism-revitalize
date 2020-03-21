<template>
  <div class="revitalize_scroll">
    <swiper ref="mySwiper">
      <swiper-slide v-for="(item,index) in FixedSfdData" :key="index">
        <ul :class="`swiper_ul swiper_ul_${index}`">
          <li v-for="({sfdName,img},index) in item" :key="index" @click="goSfd(key,index)">
            <div
              :class="[index == activeIndex?`active`:``,`bottomsingle`]"
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
  private activeIndex = 0;
  private activeSfd?: JSX.ScrollSfd;
  @State("sfdData") stateSfdData!: JSX.ScrollSfd;
  get FixedSfdData(): Array<JSX.ScrollSfd> {
    const arr: Array<any> = [];
    const _arr_: Array<any> = Object.keys(this.stateSfdData).map(
      (item: string) => {
        return {
          sfdName: item,
          img: this.stateSfdData[item].imgs[0]
        };
      }
    );
    _arr_.map((item: JSX.BottomSingle, index: number) => {
      const _index_ = Math.floor(index / 4);
      !arr[_index_] && (arr[_index_] = []);
      arr[_index_].push(item);
    });
    return arr;
  }
  //  created
  created() {
    this.activeSfd = this.FixedSfdData[this.activeIndex];
  }
  private goSfd(label: string, index: number) {
    this.activeIndex = index;
    const { $hub } = this as any;
    $hub.$emit("sfd-dom", label);
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
  width: 900px;
  .swiper_ul {
    text-align: center;
    li {
      display: inline-block;
      width: 25%;
      height: 140px;
      vertical-align: top;
      .box();
      padding: 0 10px 10px 10px;
      .active {
        border: 2px gold solid;
      }
      > .bottomsingle {
        position: relative;
        box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.5);
        .box();
        height: 100%;
        border-radius: 40px 0;
        overflow: hidden;
        background-color: rgba(255, 255, 255, 0.6);
        background-size: cover;
        .label {
          position: absolute;
          bottom: 0px;
          width: 100%;
          height: 40px;
          text-align: center;
          sfd-height: 40px;
          font-size: 18px;
          color: #fff;
          overflow: hidden;
          // padding-top: 4px;
          // background: -webkit-sfdar-gradient(top, gold, rgba(0, 0, 0, 0));
          // writing-mode: vertical-lr;
          // writing-mode: tb-lr;
        }
      }
    }
  }
}
</style>
