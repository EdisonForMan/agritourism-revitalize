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
 * 获取线路中心点
 * @param {Array<[number, number]>} paths
 * @returns {MapPoint}
 */
function fetchCenter(paths: Array<[]>): MapPoint {
  const path = paths[0];
  const index: number = Math.floor(path.length / 2);
  const mapPoint: MapPoint = {
    x: path[index][0],
    y: path[index][1]
  };
  return mapPoint;
}

/**
 * 地图点击查询
 * @param {JSX.ElementClass} context
 * @param {MapPoint} [point]
 * @returns {Promise<boolean>}
 */
function doMassIdentify(
  context: JSX.ElementClass,
  point?: MapPoint
): Promise<boolean> {
  return new Promise(resolve => {
    const { $ARCGIS_API, view, $hub, $store } = context as any;
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
      results.length &&
        $store.state.sfdData[results[0].feature.attributes.xmname] &&
        // view.goTo(results[0].feature.geometry) &&
        $hub.$emit("sfd-on", {
          sfd: {
            ...$store.state.sfdData[results[0].feature.attributes.xmname],
            sfdName: results[0].feature.attributes.xmname
          },
          attributes: results[0].feature.attributes,
          geometry: results[0].feature.geometry
        });
    });
    resolve(true);
  });
}

/**
 * 示范带查询
 * @param {JSX.ElementClass} context
 * @param {JSX.SingleSfd} [sfd]
 * @returns {Promise<boolean>}
 */
function doMassQuery(
  context: JSX.ElementClass,
  sfd: JSX.SingleSfd
): Promise<boolean> {
  return new Promise(resolve => {
    const { $ARCGIS_API, view, $hub } = context as any;
    const { QueryTask, Query } = $ARCGIS_API;
    const queryTask = new QueryTask(LAYER_SFD + "/0");
    const params = new Query({
      where: `xmname like '%${sfd.sfdName}%'`,
      outFields: ["*"],
      returnGeometry: true
    });
    queryTask.execute(params).then(({ features }: any) => {
      features.length &&
        // view.goTo(features[0].geometry) &&
        $hub.$emit("sfd-on", {
          sfd,
          attributes: features[0].attributes,
          geometry: features[0].geometry
        });
    });
    resolve(true);
  });
}

function doMassSymbol(context: JSX.ElementClass): void {
  const { $ARCGIS_API, view } = context as any;
  const { QueryTask, Query, Point, Graphic } = $ARCGIS_API;
  const queryTask = new QueryTask(LAYER_SFD + "/0");
  const params = new Query({
    where: "1=1",
    outFields: ["xmname"],
    returnGeometry: true
  });
  queryTask.execute(params).then(({ features }: any) => {
    features.length &&
      features.map((item: any) => {
        view.graphics.add(
          new Graphic({
            geometry: new Point(fetchCenter(item.geometry.paths)),
            symbol: {
              text: item.attributes.xmname.slice(0,4),
              type: "text", // autocasts as new TextSymbol()
              color: [255, 255, 255, 0.85],
              haloColor: "grey",
              haloSize: 1,
              font: {
                size: 14,
                weight: "bold"
              }
            }
          })
        );
      });
  });
}

/**
 * 地图初始化
 * @param {JSX.ElementClass} context
 * @returns {Promise<boolean>}
 */
function doMassMap(context: JSX.ElementClass): Promise<boolean> {
  return new Promise(resolve => {
    const { $ARCGIS_API, map, view } = context as any;
    const { MapImageLayer } = $ARCGIS_API;
    map.add(new MapImageLayer({ id: "LAYER_DTFW", url: LAYER_DTFW }));
    map.add(new MapImageLayer({ id: "LAYER_SFD", url: LAYER_SFD }));
    // doMassSymbol(context);
    view.on("click", ({ mapPoint }: Event) => {
      doMassIdentify(context, mapPoint);
    });
    view.on("mouse-wheel", (evt: any) => {
      evt.stopPropagation();
    });
    view.on("drag", (evt: any) => {
      evt.stopPropagation();
    });
    resolve(true);
  });
}

export { doMassMap, doMassQuery, doMassIdentify };
