<template>
  <div class="revitalize_project">
    <header>{{title}}</header>
    <div class="video"></div>
    <div class="imgs">
      <header>项目风采</header>
    </div>
    <div class="text">
      <header>景点简介</header>
      <p>{{text}}</p>
    </div>
    <div class="detail">
      <img />
      <ul>
        <li v-for="(item,key,index) in details" :key="index">
          <span>{{key}}:</span>
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class RevitalizeProjectPanel extends Vue {
  private title = "雁楠逸园";
  @Prop({ default: "test" }) private text!: string;
  @Prop({
    default: () => {
      return {
        项目名称: "对鸟一家人",
        已经建成: "8,832个",
        计划2020建成: "8,832个",
        计划2021建成: "8,832个",
        投入资金: "8,832万"
      };
    }
  })
  private details!: object;
}
</script>

<style scoped lang="less">
.revitalize_project {
  width: 380px;
  position: fixed;
  bottom: 40px;
  top: 100px;
  right: 40px;
  background-color: #fff;
  box-shadow: 0px 6px 15px #676767;
  border-radius: 40px;
  box-sizing: border-box;
  padding: 10px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    flex-direction: column;
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
    font-size: 22px;
    font-weight: bold;
    line-height: 50px;
    text-align: left;
    color: #000;
    height: 50px !important;
    box-sizing: border-box;
  }
  .video {
    height: auto;
    margin-bottom: 10px;
  }
  .imgs {
    height: auto;
    margin-bottom: 10px;
  }
  .future {
    height: auto;
    margin-bottom: 10px;
  }
  .text {
    flex: 1;
    text-align: left;
    > p {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.5);
      line-height: 24px;
    }
    margin-bottom: 10px;
  }
  .detail {
    height: 180px;
    box-sizing: border-box;
    padding: 10px 0;
    display: flex;
    flex-direction: unset;
    font-size: 14px;
    > img {
      width: 160px;
      height: 100%;
      border-radius: 20px;
      overflow: hidden;
    }
    > ul {
      box-sizing: border-box;
      list-style: none;
      padding: 0 10px;
      flex: 1;
      > li {
        width: 100%;
        height: 20%;
        span {
          display: inline-block;
        }
        span:first-child {
          float: left;
        }
        span:last-child {
          float: right;
        }
      }
    }
  }
}
</style>