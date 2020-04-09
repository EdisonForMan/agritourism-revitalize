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
Vue.prototype.$jq = (Window as any).$;
const $vue: JSX.ElementClass = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
(Window as any).$vue = $vue;

arcgisApi((arcgisApi: JSX.EsriObject) => {
  Vue.prototype.$ARCGIS_API = arcgisApi;
  (Window as any).$vue.$store.state.arcgisDone = true;
});

Vue.config.productionTip = false;
