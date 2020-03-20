<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input v-model="extra" />
    {{JSON.stringify(labelSymbol)}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
// import { doHello, labelValue } from "./Revitalize";
@Component({
  // methods: { doHello }
})
export default class HelloWorld extends Vue {
  //  props
  @Prop() private msg!: string;
  //  state
  private extra: any = "1";
  private labelSymbol = {
    label: "title",
    value: "test",
    doVal: (value: string) => {
      console.log("[labelDoVal]", value);
    }
  };
  //  watch
  @Watch("extra")
  public onExtraChange(n: string): void {
    console.log("[change]", n);
  }
}
</script>

<style scoped lang="less">
</style>
