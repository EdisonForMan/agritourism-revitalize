/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { arcgisApi } from "./arcgisApi";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";

Vue.use(VueAwesomeSwiper);
Vue.prototype.$hub = new Vue(); //  全局事件线程
Vue.prototype.$window = window;
const $vue: JSX.ElementClass = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
(Window as any).$vue = $vue;

arcgisApi((object: JSX.EsriObject) => {
  Vue.prototype.$ARCGIS_API = object;
  (Window as any).$vue.$store.state.arcgisDone = true;
});

Vue.config.productionTip = false;
