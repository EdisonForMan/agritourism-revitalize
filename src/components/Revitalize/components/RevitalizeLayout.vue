<template>
  <div class="revitalize_layout">
    <top />
    <left />
    <scroll />
    <transition name="fade">
      <project v-if="!doLine" />
    </transition>
    <transition name="fade">
      <dline v-if="doLine" />
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
    const { $hub } = this as any;
    $hub.$on("sfd-on", (sfdName: string) => {
      this.doLine = true;
    });
    $hub.$on("sfd-dom", (sfdName: string) => {
      this.doLine = false;
    });
    $hub.$on("project-dom", () => {
      // this.doLine = false;
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
