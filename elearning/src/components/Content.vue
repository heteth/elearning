<template>
  <div style="height: 100%; "><!--padding-bottom: 50px; for delimiters-->
    <div style="height: 100%; overflow: auto; padding-bottom: 50px">
      <h1>{{content._ref}}#{{content._type}}##{{lev3._id}}</h1>
      <h1>{{lev2.label[0]}}</h1>
      <h2>{{lev3.label[0]}}</h2>
      <div v-html="content.text && content.text[0]">
      </div>
      <v-btn @click="next">Next</v-btn>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: "Content",
  
  props: ["content", "lev2"],
  
  async beforeMount() {
    await api.trackContent(this.lev3._id)
  },

  computed: {
    lev3() {
      return this.lev2.lev3.find(i => i._ref === this.content._ref)
    }
  },
  
  methods: {
    async next() {
      this.$emit('next');
    }
  }
}
</script>

<style scoped>

</style>