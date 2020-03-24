<template>
  <div class="revitalize_header" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class RevitalizeHeader extends Vue {
  private title = "温州市乡村振兴示范带";
  private ltitle = "WENZHOU RURAL REVITALIZATION DEMONSTRATION BELT";
}
</script>

<style scoped lang="less">
.revitalize_header {
  position: fixed;
  width: 680px;
  height: 140px;
  top: -16px;
  background-image: url(../imgs/header.png);
  background-size: cover;
  z-index: 2;
  > p:first-child {
    font-size: 50px;
    font-weight: bold;
    line-height: 50px;
  }
  > p:last-child {
    margin-top: 4px;
  }
}
</style>
