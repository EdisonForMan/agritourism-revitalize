import { ARCGIS_OPTION } from "./config";
import { loadModules } from "esri-loader";
import Vue from 'vue'

export function arcgisApi(fn: Function) {
    //  ARCGIS_API
    loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/Legend",
        "esri/layers/VectorTileLayer",
        "esri/layers/TileLayer",
        "esri/layers/FeatureLayer",
        "esri/layers/MapImageLayer",
        "esri/tasks/IdentifyTask", "esri/tasks/support/IdentifyParameters"
    ], ARCGIS_OPTION).then(([Map, MapView, Legend, VectorTileLayer, TileLayer, FeatureLayer, MapImageLayer, IdentifyTask, IdentifyParameters]) => {
        fn && fn({ Map, MapView, Legend, VectorTileLayer, TileLayer, FeatureLayer, MapImageLayer, IdentifyTask, IdentifyParameters })
    });
}