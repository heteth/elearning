<template>
  <div v-if="root">
    <div v-for="(structure, index) of root.structure" :key="index">
      <div v-for="lev1 of structure.lev1" :key="lev1.ref">
        <Scene :lev1="lev1.ref" :structure="structure"></Scene>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Scene from "@/components/Scene";

export default {
  name: "Structure",
  
  components: {Scene},
  data: () => ({
    root: null,
  }),

  async beforeMount() {
    this.root = await api.fetchStructure()
  },
}
</script>

<style>
</style>