<template>
  <div class="revitalize_top">
    <header>
      <span>各县市区建设带统计</span>
      <i>2018-2020年</i>
      <i>单位:条</i>
    </header>
    <div class="container">
      <div>
        <span v-for="(item,index) in title.split(',')" :key="index">{{item}}</span>
      </div>
      <div v-for="(item,index) in value" :key="index">
        <span v-for="(_item_,_index_) in item.split(',')" :key="_index_">{{_item_}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class RevitalizeTopPanel extends Vue {
  private title =
    "统计,永嘉,乐清,鹿城,瓯海,龙湾,洞头,瑞安,平阳,文成,龙港,苍南,泰顺";
  private value: Array<string> = [
    "已建,06,05,02,03,02,07,05,06,05,01,06,05",
    "拟建,08,07,02,03,01,04,07,07,07,00,07,07"
  ];
}
</script>

<style scoped lang="less">
.box() {
  box-sizing: border-box;
}
.revitalize_top {
  position: fixed;
  top: 120px;
  left: 480px;
  background-color: #fff;
  box-shadow: 0px 6px 15px #676767;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 6px 10px;
  text-align: left;

  > header {
    margin: 6px 0;
    vertical-align: top;
    > span {
      display: inline-block;
      font-size: 18px;
      font-weight: bold;
      text-align: left;
      line-height: 30px;
      height: 30px;
      color: rgba(26, 147, 74, 1);
      position: relative;
    }
    > span:before {
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
    > i {
      font-size: 12px;
      color: rgba(153, 153, 153, 1);
      margin-left: 20px;
      font-style: normal;
    }
    > i:last-child {
      float: right;
    }
  }
  .container {
    > div:first-child {
      background-color: rgba(236, 236, 236, 1);
      > span {
        color: rgba(51, 51, 51, 1);
      }
    }
    > div {
      font-size: 12px;
      padding: 4px 0;
      > span {
        color: rgba(153, 153, 153, 1);
        display: inline-block;
        vertical-align: top;
        width: 40px;
        text-align: center;
      }
    }
  }
}
</style>
