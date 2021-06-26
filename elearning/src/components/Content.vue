<template>
  <div style="height: 100%; "><!--padding-bottom: 50px; for delimiters-->
    <div style="height: 100%; overflow: auto; padding-bottom: 50px">
      <h1>{{content.ref}}#{{content.type}}</h1>
      <h1>{{lev2.label[0]}}</h1>
      <h2>{{lev3.label[0]}}</h2>
      <div v-html="content.text && content.text[0]">
      </div>
      <v-btn @click="$emit('next')">Next</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Content",
  
  props: ["content", "lev2"],
  
  computed: {
    lev3() {
      return this.lev2.lev3.find(i => i._ref === this.content._ref)
    }
  }
}
</script>

<style scoped>

</style>