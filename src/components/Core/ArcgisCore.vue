<template>
  <div />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LAYER_IMAGE, MAP_INIT_OPTION, spatialReference } from "@/config";

@Component({})
export default class ArcgisCore extends Vue {
  @Prop({ default: "ARCGIS_MAP" }) private mapId!: number;
  
  //    esri object <T>
  public map: any;
  public view: any;

  //    initMap Promise<Boolean>
  public initMap(mapId: string): Promise<boolean> {
    const { Map, MapView, VectorTileLayer } = (this as any).$ARCGIS_API;
    return new Promise(resolve => {
      this.map = Map({
        layers: [
          // new VectorTileLayer({
          //   id: "LAYER_IMAGE",
          //   url: LAYER_IMAGE
          // })
        ]
      });
      //设置地图容器
      this.view = new MapView({
        ...MAP_INIT_OPTION,
        container: mapId,
        map: this.map
      });
      this.view.ui._removeComponents(["zoom", "attribution"]);
      resolve(true);
    });
  }
}
</script>
