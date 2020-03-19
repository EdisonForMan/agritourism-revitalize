<template>
  <div class="revitalize">
    <arcgis refs="arcgis" />
    <div class="shadow" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Arcgis from "./Arcgis/Arcgis.vue";
@Component({
  components: {
    ["arcgis"]: Arcgis
  }
})
export default class Revitalize extends Vue {}
</script>

<style scoped lang="less">
.revitalize {
  height: 100%;
  .shadow {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    box-shadow: 0px 0px 100px 55px #3e9613 inset;
  }
}
</style>
