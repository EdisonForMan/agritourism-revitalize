<template>
  <div class="revitalize_line" :id="MapId" />
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import ArcgisCore from "@/components/Core/ArcgisCore.vue";
import { doMassMap } from "./ArcgisLine";
@Component({
  methods: { doMassMap }
})
export default class ArcgisLine extends Mixins(ArcgisCore) {
  protected id: number = +new Date();
  //    Getter/
  get MapId(): string {
    return "arcgisLine_" + this.id;
  }
  //  mounted
  async mounted(): Promise<void> {
    await this.initMap(this.MapId);
    await doMassMap(this);
  }
}
</script>

<style scoped lang="less">
.revitalize_line {
  height: 100%;
}
</style>
