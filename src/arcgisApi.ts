import { ARCGIS_OPTION } from "./config";
import { loadModules } from "esri-loader";

export function arcgisApi(fn: Function) {
  //  ARCGIS_API
  loadModules(
    [
      "esri/Map",
      "esri/views/MapView",
      //   "esri/layers/VectorTileLayer",
      //   "esri/layers/TileLayer",
      //   "esri/layers/FeatureLayer",
      "esri/layers/MapImageLayer",
      "esri/tasks/QueryTask",
      "esri/tasks/support/Query",
      "esri/tasks/IdentifyTask",
      "esri/tasks/support/IdentifyParameters",
      "esri/geometry/Point",
      "esri/Graphic"
    ],
    ARCGIS_OPTION
  ).then(
    ([
      Map,
      MapView,
      //   VectorTileLayer,
      //   TileLayer,
      //   FeatureLayer,
      MapImageLayer,
      QueryTask,
      Query,
      IdentifyTask,
      IdentifyParameters,
      Point,
      Graphic
    ]) => {
      fn &&
        fn({
          Map,
          MapView,
          //   Legend,
          //   VectorTileLayer,
          //   TileLayer,
          //   FeatureLayer,
          MapImageLayer,
          QueryTask,
          Query,
          IdentifyTask,
          IdentifyParameters,
          Point,
          Graphic
        });
    }
  );
}
