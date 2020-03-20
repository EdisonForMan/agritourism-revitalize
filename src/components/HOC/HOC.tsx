import { Component, Vue } from "vue-property-decorator";

@Component
export default class HOC extends Vue {
  protected render() {
    return <div />;
  }
}
