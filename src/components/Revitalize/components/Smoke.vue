<template>
  <div class="revitalize_smoke">
    <img :class="[doSmoke?'move_left':'smoke_left']" :src="left" />
    <img :class="[doSmoke?'move_right':'smoke_right']" :src="right" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class RevitalizeSmoke extends Vue {
  private doSmoke = false;
  private left = require("@/components/Revitalize/imgs/smoke-left.png");
  private right = require("@/components/Revitalize/imgs/smoke-right.png");
  mounted() {
    this.eventRegister();
  }
  private eventRegister(): void {
    const { $hub } = this as any;
    $hub.$on("smoke-on", () => {
      this.doSmoke = true;
      setTimeout(() => {
        this.feedback();
      }, 1000);
    });
  }
  private feedback(): void {
    this.doSmoke = false;
  }
}
</script>

<style scoped lang="less">
.revitalize_smoke {
  width: 0px;
  height: 0px;
  > img {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 10;
    top: 0;
    transition: all 1s;
  }
  .smoke_left {
    left: -100%;
  }
  .move_left {
    left: 0 !important;
  }
  .smoke_right {
    right: -100%;
  }
  .move_right {
    right: 0 !important;
  }
}
</style>
