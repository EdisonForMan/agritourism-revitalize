<template>
  <header class="revitalize_header">
    <p>{{title}}</p>
    <!-- <p>{{ltitle}}</p> -->
  </header>
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
  top: 20px;
  left: 40px;
  // transform: translateX(-50%);
  // text-shadow: 0px 6px 10px #000;
  color: #0073f8;
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
