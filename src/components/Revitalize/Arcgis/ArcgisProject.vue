<template>
  <div class="revitalize_project" :id="MapId" />
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import ArcgisCore from "@/components/Core/ArcgisCore.vue";
import { doMassMap, doMassQuery, doMassLocation } from "./ArcgisProject";
import { State } from "vuex-class";

@Component({
  methods: { doMassMap, doMassQuery, doMassLocation }
})
export default class ArcgisProject extends Mixins(ArcgisCore) {
  protected id: number = +new Date();
  @State("arcgisDone") stateArcgisDone!: boolean;
  @Watch("stateArcgisDone")
  async arcgisDoneChange(value: boolean) {
    if (value) {
      await this.initMap(this.MapId);
      await doMassMap(this);
    }
  }
  //    Getter/
  get MapId(): string {
    return "arcgisProject_" + this.id;
  }
  //  mounted
  async mounted(): Promise<void> {
    if (this.stateArcgisDone) {
      await this.initMap(this.MapId);
      await doMassMap(this);
    }
    this.eventRegister();
  }
  private eventRegister(): void {
    const { $hub } = this as any;
    $hub.$on("project-arcgis", async (project: JSX.SingleProject) => {
      await doMassQuery(this, project);
    });
    $hub.$on("sfd-on", (sfd: JSX.DataSfd) => {
      doMassLocation(this, sfd.geometry);
    });
  }
}
</script>

<style scoped lang="less">
.revitalize_project {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
