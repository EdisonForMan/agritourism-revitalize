<template>
  <div class="revitalize_layout">
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

@Component({
  components: {
    ["scroll"]: RevitalizeScroll,
    ["left"]: RevitalizeLeftPanel,
    ["project"]: RevitalizeProjectPanel,
    ["dline"]: RevitalizeLinePanel
  }
})
export default class RevitalizeLayout extends Vue {
  private doLine = true;
  mounted() {
    const { $hub } = this as any;
    $hub.$on("sfd-dom", () => {
      this.doLine = true;
    });
    $hub.$on("project-dom", () => {
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
