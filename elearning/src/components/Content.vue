<template>
  <div>
    <h1>{{content.ref}}#{{content.type}}</h1>
    <h1>{{lev2.label[0]}}</h1>
    <h2>{{lev3.label[0]}}</h2>
    <div v-html="content.text && content.text[0]">
    </div>
  </div>
</template>

<script>
export default {
  name: "Content",
  
  props: ["content", "lev1", "lev2", "structure"],
  
  computed: {
    lev3() {
      return this.lev2.lev3.find(i => i.ref === this.content.ref)
    }
  }
}
</script>

<style scoped>

</style>