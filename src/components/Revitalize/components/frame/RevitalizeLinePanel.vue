<template>
  <div class="revitalize_line">
    <header>{{title}}</header>
    <div class="data"></div>
    <div class="video"></div>
    <div class="text">
      <header>示范带简介</header>
    </div>
    <div class="kind">
      <header>项目类别统计(个)</header>
    </div>
    <div class="project">
      <header>精品项目</header>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class RevitalizeLinePanel extends Vue {
  private title = "山水雁楠跨区域示范带";
}
</script>

<style scoped lang="less">
.revitalize_line {
  width: 380px;
  position: fixed;
  bottom: 40px;
  top: 100px;
  right: 20px;
  background-color: #fff;
  box-shadow: 0px 6px 15px #676767;
  border-radius: 40px;
  box-sizing: border-box;
  padding: 10px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  > div {
    > header {
      font-size: 18px;
      font-weight: bold;
      text-align: left;
    }
  }
  > header {
    font-size: 22px;
    font-weight: bold;
    line-height: 50px;
    text-align: left;
    color: #000;
    height: 50px !important;
    box-sizing: border-box;
  }
  .data {
    height: auto;
    margin-bottom: 10px;
  }
  .video {
    height: auto;
    margin-bottom: 10px;
  }
  .text {
    height: auto;
    margin-bottom: 10px;
  }
  .kind {
    height: auto;
    margin-bottom: 10px;
  }
  .project {
    height: auto;
    margin-bottom: 10px;
  }
}
</style>