<template>
  <div v-if="root">
    <div>
      <Scene :lev1="root.structure[0].lev1[lev1Index]" @next-scene="next"></Scene>
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
    lev1Index: 0,
    root: null,
  }),

  async beforeMount() {
    this.root = await api.fetchStructure()
  },
  
  methods: {
    next() {
      this.lev1Index++;
    }
  }
}
</script>

<style>
</style>