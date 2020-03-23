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
    interface BottomSingle { sfdName: string, videos: string[], imgs: string[] }
    interface ScrollSfd {
      [elem: string]: BottomSingle
    }
  }
}
