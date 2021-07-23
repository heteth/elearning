<template>
  <div>
  <v-carousel
      :show-arrows="false"
      :continuous="false"
      hide-delimiters
      height="auto"
      v-model="slide"
  >
    <v-carousel-item
        v-for="l3 of lev3"
        :key="l3._ref"
    >
      <Content :content="l3.content" :lev2="lev2" @next="next"></Content>
    </v-carousel-item>
    <v-carousel-item v-if="lev2.challenge"><Challenge :challenge="lev2.challenge[0]._id" @next="next"></Challenge></v-carousel-item>
  </v-carousel>
  </div>
</template>

<script>
import Content from "@/components/Content";
import Challenge from "@/components/Challenge";

export default {
  name: "Lev2",
  
  components: {Content, Challenge},
  
  props: ["lev2", "lev3"], 
  
  data: () => ({
    slide: 0
  }),
  
  watch: {
    lev2($new, $old) {
      if ($new !== $old)
        this.slide = 0;
    }
  },
  
  methods: {
    next() {
      console.log("NEXT!!")
      const slides = this.lev3.length + this.lev2.challenge?.length
      if (this.slide < slides - 1) {
        this.slide++
      } else {
        this.$emit('next')
      }
    }
  }
}
</script>

<style scoped>

</style>