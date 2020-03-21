/**
 * Arcgis methods
 * created by eds 2020/3/19
 */
interface MapPoint {
    x: number;
    y: number;
}
interface Event {
    mapPoint: MapPoint;
}
import { LAYER_SHDT } from "@/config/index";

/**
 * 地图点击查询
 * @param {JSX.ElementClass} context
 * @param {MapPoint} [point]
 * @returns {Promise<boolean>}
 */
function doMassQuery(context: JSX.ElementClass, point?: MapPoint): Promise<boolean> {
    return new Promise(resolve => {
        resolve(true);
    });
}

/**
 * 项目地图初始化
 * @param {JSX.ElementClass} context
 * @returns {Promise<boolean>}
 */
function doMassMap(context: JSX.ElementClass): Promise<boolean> {
    return new Promise(resolve => {
        const { $ARCGIS_API, map, view } = (context as any);
        const { MapImageLayer } = $ARCGIS_API;
        map.add(new MapImageLayer({
            id: "LAYER_SHDT",
            url: LAYER_SHDT,
        }));
        view.on("click", ({ mapPoint }: Event) => {
            doMassQuery(context, mapPoint);
        });
        resolve(true);
    });
}

export { doMassMap, doMassQuery }