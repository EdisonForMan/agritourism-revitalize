import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode { }
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue { }
    interface IntrinsicElements {
      [elem: string]: any;
    }
    //  echart option
    interface ChartOption { xAxis: Array<any>, yAxis?: Array<any>, series: Array<any>, color?: string[] }
    //  mock data
    interface SingleSfd {
      sfdName: string, videos: string[], imgs: string[], shallLine?: boolean
    }
    interface ScrollSfd {
      [elem: string]: SingleSfd
    }
    interface SingleProject { projectName?: string, sfdName?: string, videos: string[], nowImgs: string[], futureImgs?: string[] }
    interface ScrollProject {
      [elem: string]: SingleProject
    }
    //  sfd
    interface DataSfd {
      sfd: SingleSfd,
      attributes: object,
      geometry: MapPoint
    }
    interface DataProject {
      project: SingleProject,
      attributes: object
    }
    //  esri Interface
    interface EsriObject {
      [elem: string]: any
    }
    interface MapPoint {
      x: number;
      y: number;
    }
  }
}
