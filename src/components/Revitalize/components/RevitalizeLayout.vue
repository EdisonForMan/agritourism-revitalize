<template>
  <div class="revitalize_layout">
    <top v-if="false"/>
    <left />
    <scroll />
    <transition name="fade">
      <project v-show="!doLine" />
    </transition>
    <transition name="fade">
      <dline v-show="doLine" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RevitalizeScroll from "./frame/RevitalizeScroll.vue";
import RevitalizeLeftPanel from "./frame/RevitalizeLeftPanel.vue";
import RevitalizeProjectPanel from "./frame/RevitalizeProjectPanel.vue";
import RevitalizeLinePanel from "./frame/RevitalizeLinePanel.vue";
import RevitalizeTopPanel from "./frame/RevitalizeTopPanel.vue";

@Component({
  components: {
    ["scroll"]: RevitalizeScroll,
    ["top"]: RevitalizeTopPanel,
    ["left"]: RevitalizeLeftPanel,
    ["project"]: RevitalizeProjectPanel,
    ["dline"]: RevitalizeLinePanel
  }
})
export default class RevitalizeLayout extends Vue {
  private doLine = true;
  mounted() {
    this.eventRegister();
  }
  private eventRegister(): void {
    const { $hub } = this as any;
    $hub.$on("sfd-on", () => {
      //  点击地图或点击项目轮播,显示精品带详情
      this.doLine = true;
    });
    $hub.$on("back-sfd", () => {
      //  返回到精品示范带,与sfd-on区分
      this.doLine = true;
    });
    $hub.$on("project-on", () => {
      this.doLine = false;
    });
  }
}
</script>

<style scoped lang="less">
.revitalize_layout {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  z-index: 3;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
