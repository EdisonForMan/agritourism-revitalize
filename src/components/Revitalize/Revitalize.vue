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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RevitalizeHeader from "./components/RevitalizeHeader.vue";
import RevitalizeLayout from "./components/RevitalizeLayout.vue";
import ArcgisLine from "./Arcgis/ArcgisLine.vue";
import ArcgisProject from "./Arcgis/ArcgisProject.vue";

@Component({
  components: {
    ["rheader"]: RevitalizeHeader,
    ["rlayout"]: RevitalizeLayout,
    ["arcgisLine"]: ArcgisLine,
    ["arcgisProject"]: ArcgisProject
  }
})
export default class Revitalize extends Vue {
  private doLine = true;
  mounted() {
    const { $hub } = this as any;
    $hub.$on("sfd-on", (sfdName: string) => {
      this.doLine = true;
    });
    $hub.$on("sfd-dom", () => {
      this.doLine = false;
    });
    $hub.$on("project-dom", () => {
      // this.doLine = false;
    });
  }
}
</script>

<style scoped lang="less">
.revitalize {
  height: 100%;
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
