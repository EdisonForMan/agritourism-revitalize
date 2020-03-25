<template>
  <div class="revitalize_line" :id="MapId" />
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import ArcgisCore from "@/components/Core/ArcgisCore.vue";
import { doMassMap, doMassQuery } from "./ArcgisLine";
import { State } from "vuex-class";

@Component({
  methods: { doMassMap, doMassQuery }
})
export default class ArcgisLine extends Mixins(ArcgisCore) {
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
    return "arcgisLine_" + this.id;
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
    $hub.$on("sfd-arcgis", async (sfd: JSX.SingleSfd) => {
      await doMassQuery(this, sfd);
    });
  }
}
</script>

<style scoped lang="less">
.revitalize_line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
