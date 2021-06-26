<template>
<div v-if="root">
  <v-tabs vertical v-model="tab">
    <v-tab-item
        v-for="lev2 of lev1.lev2"
        :key="lev2._ref"
    >
      <Lev2 :lev2="lev2" :lev3="lev2.lev3.map(l3 => ({...l3, content: root.data[0].content.find(c => c._ref === l3._ref)}))" @next="next"></Lev2>
    </v-tab-item>
    <v-tab
        v-for="lev2 of lev1.lev2"
        :key="lev2._ref"
    >
      {{lev2.label[0]}}
    </v-tab>
  </v-tabs>
</div>
</template>

<script>
import api from "@/api";
import Lev2 from "@/components/Lev2";

export default {
  name: "Scene",
  components: {Lev2},
  props: ["lev1"],
  
  data: () => ({
    root: null,
    tab: 1,
  }),
  
  async beforeMount() {
    this.root = await api.fetchSceneData(this.lev1._ref)
  },
  
  watch: {
    async lev1($new, $old) {
      if ($new !== $old) {
        this.root = null;
        this.tab = 0;
        this.slide = 0;
        this.root = await api.fetchSceneData(this.lev1._ref)
      }
    },
    tab($new, $old) {
      if ($new !== $old) {
        this.slide = 0;
      }
    }
  },
  
  methods: {
    next() {
      const tabs = this.lev1.lev2.length
      
      if (this.tab < tabs - 1) {
        this.tab++;
      }
      else 
        this.$emit('next-scene')
    },
  }
}
</script>

<style scoped>

</style>