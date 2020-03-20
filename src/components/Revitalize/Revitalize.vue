<template>
  <div class="revitalize">
    <rheader />
    <arcgis />
    <rlayout />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RevitalizeHeader from "./components/RevitalizeHeader.vue";
import RevitalizeLayout from "./components/RevitalizeLayout.vue";
import Arcgis from "./Arcgis/Arcgis.vue";
@Component({
  components: {
    ["rheader"]: RevitalizeHeader,
    ["rlayout"]: RevitalizeLayout,
    ["arcgis"]: Arcgis
  }
})
export default class Revitalize extends Vue {}
</script>

<style scoped lang="less">
.revitalize {
  height: 100%;
}
</style>
