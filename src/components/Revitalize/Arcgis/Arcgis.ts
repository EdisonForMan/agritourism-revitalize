/**
 * Arcgis methods
 * created by eds 2020/3/19
 */
import { LAYER_SHDT } from "@/config/index";

/**
 * [doMassMap] add map layer
 * @param context 
 */
function doMassMap(context: JSX.ElementClass): Promise<boolean> {
    return new Promise(resolve => {
        const { $ARCGIS_API } = (context as any);
        const { TileLayer } = $ARCGIS_API;
        (context as any).map.add(new TileLayer({
            id: "LAYER_SHDT",
            url: LAYER_SHDT
        }));
        resolve(true);
    });
}
export { doMassMap }