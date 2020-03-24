import { Component, Vue } from "vue-property-decorator";

/**
 * 高阶组件
 * @export
 * @class HOC
 * @extends {Vue}
 * eds by 2020.3.24
 */
@Component
export default class HOC extends Vue {
  protected render() {
    return <div />;
  }
}
