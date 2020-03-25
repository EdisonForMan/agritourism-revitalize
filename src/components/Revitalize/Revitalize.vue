<template>
  <div class="revitalize">
    <rheader />
    <transition name="fade">
      <arcgisProject v-show="!doLine" />
    </transition>
    <transition name="fade">
      <arcgisLine v-show="doLine" />
    </transition>
    <rlayout />
    <smoke />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RevitalizeHeader from "./components/RevitalizeHeader.vue";
import RevitalizeLayout from "./components/RevitalizeLayout.vue";
import ArcgisLine from "./Arcgis/ArcgisLine.vue";
import ArcgisProject from "./Arcgis/ArcgisProject.vue";
import Smoke from "./components/Smoke.vue";

@Component({
  components: {
    ["rheader"]: RevitalizeHeader,
    ["rlayout"]: RevitalizeLayout,
    ["arcgisLine"]: ArcgisLine,
    ["arcgisProject"]: ArcgisProject,
    ["smoke"]: Smoke
  }
})
export default class Revitalize extends Vue {
  private doLine = true;
  mounted() {
    this.eventRegister();
  }
  private eventRegister(): void {
    const { $hub } = this as any;
    $hub.$on("sfd-on", (sfd: JSX.DataSfd) => {
      if (!sfd.sfd.shallLine) {
        $hub.$emit("smoke-on", {});
        setTimeout(() => {
          this.doLine = false;
        }, 500);
      }
    });
    $hub.$on("project-on", () => {
      $hub.$emit("smoke-on", {});
      setTimeout(() => {
        this.doLine = false;
      }, 500);
    });
    $hub.$on("back-sfd", () => {
      $hub.$emit("smoke-on", {});
      setTimeout(() => {
        this.doLine = true;
      }, 500);
    });
  }
}
</script>

<style scoped lang="less">
.revitalize {
  height: 100%;
  position: relative;
}
.revitalize:before {
  content: "";
  position: fixed;
  bottom: 0;
  height: 140px;
  width: 100%;
  left: 0;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.8),
    rgba(0, 0, 0, 0)
  ) !important;
  z-index: 2;
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
