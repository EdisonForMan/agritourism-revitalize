<template>
  <div class="revitalize_layout">
    <left />
    <scroll />
    <detail v-if="!doLine" />
    <dline v-if="doLine" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RevitalizeScroll from "./frame/RevitalizeScroll.vue";
import RevitalizeLeftPanel from "./frame/RevitalizeLeftPanel.vue";
import RevitalizeDetailPanel from "./frame/RevitalizeDetailPanel.vue";
import RevitalizeLinePanel from "./frame/RevitalizeLinePanel.vue";

@Component({
  components: {
    ["scroll"]: RevitalizeScroll,
    ["left"]: RevitalizeLeftPanel,
    ["detail"]: RevitalizeDetailPanel,
    ["dline"]: RevitalizeLinePanel
  }
})
export default class RevitalizeLayout extends Vue {
  private doLine = true;
}
</script>

<style scoped lang="less">
.revitalize_layout {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
}
</style>
