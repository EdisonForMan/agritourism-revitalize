<template>
  <div class="revitalize_map" :id="MapId" />
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import ArcgisCore from "@/components/Core/ArcgisCore.vue";
import { doMassMap } from "./Arcgis";
@Component({
  methods: { doMassMap }
})
export default class Arcgis extends Mixins(ArcgisCore) {
  protected id: number = +new Date();
  //    Getter/
  get MapId(): string {
    return "arcgis_" + this.id;
  }
  //  mounted
  async mounted(): Promise<void> {
    await this.initMap(this.MapId);
    await doMassMap(this);
  }
}
</script>

<style scoped lang="less">
.revitalize_map {
  height: 100%;
}
</style>
