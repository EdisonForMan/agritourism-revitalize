/**
 * Arcgis methods
 * created by eds 2020/3/19
 */
import { LAYER_SHDT, LAYER_DTFW, LAYER_SFD } from "@/config/index";

/**
 * [doMassMap] add map layer
 * @param context 
 */
function doMassMap(context: JSX.ElementClass): Promise<boolean> {
    return new Promise(resolve => {
        const { $ARCGIS_API } = (context as any);
        const { VectorTileLayer, TileLayer, MapImageLayer, FeatureLayer } = $ARCGIS_API;
        (context as any).map.add(new MapImageLayer({
            id: "LAYER_SFD",
            url: LAYER_SFD
        }));
        (context as any).map.add(new TileLayer({
            id: "LAYER_DTFW",
            url: LAYER_DTFW,
        }));

        resolve(true);
    });
}

/**
 * [doMassMap] do event query
 * @param context 
 */
function doMassQuery(context: JSX.ElementClass, point?: object): Promise<boolean> {
    return new Promise(resolve => {
        point && console.log(context, point);
        resolve(true);
    });
}

export { doMassMap, doMassQuery }