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
    interface ChartOption { xAxis: any[], yAxis?: any[], series: any[], color?: string[] }
    //  mock data
    interface BottomSingle { label: string }
  }
}
