<template>
  <div class="revitalize_scroll">
    <swiper ref="mySwiper">
      <swiper-slide v-for="(item,index) in FixedBottomArray" :key="index">
        <ul :class="`swiper_ul swiper_ul_${index}`">
          <li v-for="({label},index) in item" :key="index">
            <div :class="[!index?`active`:``,`bottomsingle`]">
              <div class="label">{{label}}</div>
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
  @State("bottomArray") stateBottomArray!: JSX.BottomSingle[];
  get FixedBottomArray(): Array<JSX.BottomSingle[]> {
    const arr: Array<any> = [];
    this.stateBottomArray.map((item: JSX.BottomSingle, index: number) => {
      const _index_ = Math.floor(index / 4);
      !arr[_index_] && (arr[_index_] = []);
      arr[_index_].push(item);
    });
    return arr;
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
  width: 800px;
  .swiper_ul {
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
        background-color: rgba(255,255,255,0.6);
        .label {
          width: 54px;
          height: 100%;
          text-align: center;
          line-height: 54px;
          font-size: 16px;
          color: #fff;
          overflow: hidden;
          padding-top: 4px;
          background: -webkit-linear-gradient(top, gold, rgba(0, 0, 0, 0));
          writing-mode: vertical-lr;
          writing-mode: tb-lr;
        }
      }
    }
  }
}
</style>
