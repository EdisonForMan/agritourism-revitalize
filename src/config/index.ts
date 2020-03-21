/* eslint-disable */
/**
 * http api interface url config
 * get env by domain
 * update by eds 2020/3/19
 */
const CONFIG_DEV = {
    ARCGIS_API_URL: "https://lysb.lucheng.gov.cn/lc/libs/arcgis_js_v412_api/arcgis_js_api/library/4.12/dojo/dojo.js",
    LOCAL_HOST: "http://172.20.89.59/server/rest/services",
    TDT_HOST: "https://services.wzmap.gov.cn/server/rest/services",
    OTHER_HOST: "http://218.75.26.62:6443/arcgis/rest/services",
};
//  坐标系
const spatialReference = { wkid: 4490 }
//  地图初始配置
const MAP_INIT_OPTION = { center: [120.86137599886428, 28.1246809092924], zoom: 10 };
const TO_CONFIG = CONFIG_DEV;
//  环境变量 配置信息获取
const {
    ARCGIS_API_URL,
    // LOCAL_DOMAIN,
} = TO_CONFIG;
//  ARCGIS FOR JS库本地地址
const ARCGIS_OPTION = {
    url: ARCGIS_API_URL,
};

//  底图配置
const LAYER_IMAGE = `${CONFIG_DEV.TDT_HOST}/Hosted/JYB/VectorTileServer`;
//  温州手绘图-项目 [0:地图]
const LAYER_SHDT = `${CONFIG_DEV.OTHER_HOST}/NYDSJ/ZDXM_DT/MapServer`;
//  温州手绘图-项目 [0:项目数据]
const LAYER_SHDT_DATA = `${CONFIG_DEV.OTHER_HOST}/NYDSJ/ZDXM_DW/MapServer`
//  温州手绘图-示范带 [0:地图]
const LAYER_DTFW = `${CONFIG_DEV.OTHER_HOST}/NYDSJ/DT1/MapServer`;
//  温州手绘图-示范带 [0:带]
const LAYER_SFD = `${CONFIG_DEV.OTHER_HOST}/NYDSJ/sfd/MapServer`


export { ARCGIS_OPTION, CONFIG_DEV, MAP_INIT_OPTION, spatialReference, LAYER_IMAGE, LAYER_SHDT, LAYER_DTFW, LAYER_SFD }