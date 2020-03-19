<template>
  <div class="home">
    <Revitalize />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Revitalize from "@/components/Revitalize/Revitalize.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { Revitalize }
})
export default class Home extends Vue {}
</script>
