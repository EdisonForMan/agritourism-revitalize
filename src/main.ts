/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ARCGIS_OPTION } from "./config";
import { loadModules } from "esri-loader";
Vue.config.productionTip = false;
//  ARCGIS_API
loadModules([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Legend",
  "esri/layers/VectorTileLayer",
  "esri/layers/TileLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/MapImageLayer"
], ARCGIS_OPTION).then(([Map, MapView, Legend, VectorTileLayer, TileLayer, FeatureLayer, MapImageLayer]) => {
  Vue.prototype.$ARCGIS_API = { Map, MapView, Legend, VectorTileLayer, TileLayer, FeatureLayer, MapImageLayer };
  const $vue: JSX.ElementClass = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
  (Window as any).$vue = $vue;
});

