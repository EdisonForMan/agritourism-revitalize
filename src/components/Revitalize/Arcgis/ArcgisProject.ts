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
import { LAYER_SHDT, LAYER_PROJECT, PIN } from "@/config/index";

function doMassLocation(context: JSX.ElementClass, point?: MapPoint) {
  (context as any).view.goTo(point);
}

/**
 * 获取线路中心点
 * @param {Array<[number, number]>} rings
 * @returns {MapPoint}
 */
function fetchCenter([ring]: Array<any>): object {
  let _x = 0,
    _y = 0,
    count = 0;
  ring.map((item: Array<number>) => {
    _x += item[0];
    _y += item[1];
    count += 1;
  });
  const center: object = {
    x: _x / count,
    y: _y / count,
    type: "point",
  };
  return center;
}

/**
 * 图钉坐标
 * @param {JSX.ElementClass} context
 * @param {*} [geometry]
 */
function doProjectLocation(context: JSX.ElementClass, geometry?: any) {
  const { view, $ARCGIS_API } = context as any;
  const { Graphic, Point } = $ARCGIS_API;
  view.graphics.removeAll();
  const symbol = {
    type: "picture-marker",
    url: PIN,
    width: "50px",
    height: "50px",
    yoffset: 16,
  };
  const graphic = new Graphic({
    geometry: new Point(geometry),
    symbol,
  });
  view.graphics.add(graphic);
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
  return new Promise((resolve) => {
    const { $ARCGIS_API, view, $hub, $store } = context as any;
    const { IdentifyTask, IdentifyParameters } = $ARCGIS_API;
    const identifyTask = new IdentifyTask(LAYER_PROJECT);
    const params = new IdentifyParameters({
      tolerance: 30,
      width: view.width,
      height: view.height,
      returnGeometry: true,
      geometry: point,
      mapExtent: view.extent,
    });
    identifyTask.execute(params).then(({ results }: any): void => {
      if (results.length) {
        doProjectLocation(
          context,
          fetchCenter(results[0].feature.geometry.rings)
        );
        $hub.$emit("project-on", {
          project: {
            ...$store.state.projectData[results[0].feature.attributes.名称],
            projectName: results[0].feature.attributes.名称,
          },
          attributes: results[0].feature.attributes,
        });
      }
    });
    resolve(true);
  });
}

/**
 * 项目查询
 * @param {JSX.ElementClass} context
 * @param {JSX.SingleProject} project
 * @returns {Promise<boolean>}
 */
function doMassQuery(
  context: JSX.ElementClass,
  project: JSX.SingleProject
): Promise<boolean> {
  return new Promise((resolve) => {
    const { $ARCGIS_API, view, $hub } = context as any;
    const { QueryTask, Query } = $ARCGIS_API;
    const queryTask = new QueryTask(LAYER_PROJECT + "/0");
    const params = new Query({
      where: `NAME_1 like '%${project.projectName}%'`,
      outFields: ["*"],
      returnGeometry: true,
    });
    queryTask.execute(params).then(({ features }: any) => {
      if (features.length) {
        doProjectLocation(context, fetchCenter(features[0].geometry.rings));
        $hub.$emit("project-on", {
          project: {
            ...project,
            projectName: features[0].attributes.NAME_1,
          },
          attributes: features[0].attributes,
        });
      }
    });
    resolve(true);
  });
}

/**
 * 示范带-项目查询
 * @param {JSX.ElementClass} context
 * @param {JSX.SingleProject} project
 * @returns {Promise<boolean>}
 */
function doMassQueryBySfd(
  context: JSX.ElementClass,
  sfdName: string
): Promise<any> {
  return new Promise((resolve) => {
    const { $ARCGIS_API } = context as any;
    const { QueryTask, Query } = $ARCGIS_API;
    const queryTask = new QueryTask(LAYER_PROJECT + "/0");
    const params = new Query({
      where: `1=1`,
      outFields: ["fenlei"],
      returnGeometry: false,
    });
    queryTask.execute(params).then(({ features }: any) => {
      const data: any = {
        obj: {},
        sum: 0,
      };
      if (features.length) {
        features.map(({ attributes }: any) => {
          const kind = attributes.fenlei;
          !data.obj[kind] && (data.obj[kind] = 0);
          data.obj[kind] += 1;
          data.sum += 1;
        });
        resolve(data);
      } else {
        resolve([]);
      }
    });
  });
}

/**
 * 项目地图初始化
 * @param {JSX.ElementClass} context
 * @returns {Promise<boolean>}
 */
function doMassMap(context: JSX.ElementClass): Promise<boolean> {
  return new Promise((resolve) => {
    const { $ARCGIS_API, map, view } = context as any;
    const { MapImageLayer } = $ARCGIS_API;
    map.add(
      new MapImageLayer({
        id: "LAYER_SHDT",
        url: LAYER_SHDT,
      })
    );
    view.on("click", ({ mapPoint }: Event) => {
      doMassIdentify(context, mapPoint);
    });
    view.on("mouse-wheel", (evt: any) => {
      evt.stopPropagation();
    });
    resolve(true);
  });
}

export { doMassMap, doMassQuery, doMassLocation, doMassQueryBySfd };
