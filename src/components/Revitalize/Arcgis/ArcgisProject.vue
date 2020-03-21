<template>
  <div class="revitalize_project" :id="MapId" />
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import ArcgisCore from "@/components/Core/ArcgisCore.vue";
import { doMassMap } from "./ArcgisProject";
@Component({
  methods: { doMassMap }
})
export default class ArcgisProject extends Mixins(ArcgisCore) {
  protected id: number = +new Date();
  //    Getter/
  get MapId(): string {
    return "arcgisProject_" + this.id;
  }
  //  mounted
  async mounted(): Promise<void> {
    await this.initMap(this.MapId);
    await doMassMap(this);
  }
}
</script>

<style scoped lang="less">
.revitalize_project {
  height: 100%;
}
</style>
