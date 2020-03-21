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
import { LAYER_DTFW, LAYER_SFD } from "@/config/index";

/**
 * 地图点击查询
 * @param {JSX.ElementClass} context
 * @param {MapPoint} [point]
 * @returns {Promise<boolean>}
 */
function doMassQuery(context: JSX.ElementClass, point?: MapPoint): Promise<boolean> {
    return new Promise(resolve => {
        point && console.log(point);
        const { $ARCGIS_API, view, $hub } = (context as any);
        const { IdentifyTask, IdentifyParameters } = $ARCGIS_API;
        const identifyTask = new IdentifyTask(LAYER_SFD);
        const params = new IdentifyParameters({
            tolerance: 30,
            width: view.width,
            height: view.height,
            returnGeometry: true,
            geometry: point,
            mapExtent: view.extent
        });
        identifyTask.execute(params).then(({ results }: any) => {
            results.length && (
                view.goTo(results[0].feature.geometry) &&
                $hub.$emit("sfd-dom", results[0].feature)
            )
        });
        resolve(true);
    });
}

/**
 * 地图初始化
 * @param {JSX.ElementClass} context
 * @returns {Promise<boolean>}
 */
function doMassMap(context: JSX.ElementClass): Promise<boolean> {
    return new Promise(resolve => {
        const { $ARCGIS_API, map, view } = (context as any);
        const { MapImageLayer } = $ARCGIS_API;
        map.add(new MapImageLayer({
            id: "LAYER_DTFW",
            url: LAYER_DTFW,
        }));
        map.add(new MapImageLayer({
            id: "LAYER_SFD",
            url: LAYER_SFD
        }));
        view.on("click", ({ mapPoint }: Event) => {
            doMassQuery(context, mapPoint);
        });
        resolve(true);
    });
}

export { doMassMap, doMassQuery }