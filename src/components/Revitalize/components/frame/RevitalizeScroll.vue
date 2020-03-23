<template>
  <div class="revitalize_scroll">
    <swiper ref="mySwiper">
      <swiper-slide v-for="(item,index) in FixedSfdData" :key="index">
        <ul :class="`swiper_ul swiper_ul_${index}`">
          <li
            v-for="({sfdName,img},_index) in item"
            :key="_index"
            @click="goSfd(sfdName,index,_index)"
          >
            <div
              :class="[index == activeSIndex && _index == activeFIndex?`active`:``,`bottomsingle`]"
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
  private activeSIndex = 0;
  private activeFIndex = 0;
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
    this.activeSfd = this.FixedSfdData[
      this.activeSIndex * 4 + this.activeFIndex
    ];
  }
  private goSfd(sfdName: string, index: number, _index: number) {
    this.activeSIndex = index;
    this.activeFIndex = _index;
    const { $hub } = this as any;
    $hub.$emit("sfd-dom", sfdName);
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
      padding: 0 10px 20px 10px;
      .active {
        border: 2px gold solid;
        box-shadow: 0px -20px 10px rgba(241, 245, 27, 0.65) inset,
          0px 6px 10px rgba(0, 0, 0, 0.5) !important;
      }
      > .bottomsingle {
        position: relative;
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.5);
        .box();
        height: 100%;
        border-radius: 20px 0;
        overflow: hidden;
        background-color: rgba(255, 255, 255, 0.6);
        background-size: 100% 100%;
        .label {
          position: absolute;
          bottom: 0px;
          width: 100%;
          height: 34px;
          line-height: 34px;
          padding: 0 14px;
          text-align: center;
          font-size: 18px;
          color: #fff;
          box-sizing: border-box;
          white-space: normal;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
